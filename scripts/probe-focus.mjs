// Probe: Tab-focus through the page like the checker does and report visibility.
// Uses the same attach-with-flatten pattern as scripts/probe-taps.mjs.
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME_PATH || "/home/z/.cache/puppeteer/chrome/linux-156.0.8078.47/chrome-linux64/chrome";
const URL_TO_CHECK = process.argv[2] || "http://localhost:3000/";
const dir = mkdtempSync(join(tmpdir(), "probe-"));
const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${dir}`,
  "--no-first-run", "--no-default-browser-check", "--no-sandbox", "about:blank",
], { stdio: ["pipe", "pipe", "pipe"] });
let resolveWs;
const wsUrlP = new Promise((res) => { resolveWs = res; });
proc.stderr.on("data", (d) => {
  const m = String(d).match(/DevTools listening on (ws:\/\/\S+)/);
  if (m) resolveWs(m[1]);
});
process.on("exit", () => { try { proc.kill("SIGKILL"); } catch {} });

const wsUrl = await wsUrlP;
const ws = new WebSocket(wsUrl);
await new Promise((r) => (ws.onopen = r));
const raw = new Map();
let seq = 0;
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && raw.has(msg.id)) { raw.get(msg.id)(msg.result); raw.delete(msg.id); }
};
const call = (method, params = {}) => new Promise((res) => {
  const id = ++seq;
  raw.set(id, res);
  ws.send(JSON.stringify({ id, method, params }));
});

const { targetInfos } = await call("Target.getTargets");
const page = targetInfos.find((t) => t.type === "page");
const { sessionId } = await call("Target.attachToTarget", { targetId: page.targetId, flatten: true });
const cdp = (method, params = {}) => call(method, params).then((r) => r);
// flatten: messages must carry sessionId at the top level
const send = (method, params = {}) => new Promise((res) => {
  const id = ++seq;
  raw.set(id, res);
  ws.send(JSON.stringify({ sessionId, id, method, params }));
});

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: URL_TO_CHECK });
await new Promise((r) => setTimeout(r, 4500));

const report = async () => {
  const expr = `(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return "none";
    let opa = 1;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) opa *= parseFloat(getComputedStyle(e).opacity) || 0;
    const r = el.getBoundingClientRect();
    return JSON.stringify({
      sel: el.tagName + "." + (el.className || "").toString().split(" ").slice(0,2).join("."),
      opa: Math.round(opa * 100) / 100,
      top: Math.round(r.top), h: Math.round(r.height),
      parentCls: (el.parentElement ? el.parentElement.className : "").toString().slice(0, 40),
    });
  })()`;
  const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(res && res.result ? res.result.value : JSON.stringify(res));
};

const tab = async () => {
  await send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
};

for (let i = 1; i <= 8; i++) {
  await tab();
  await new Promise((r) => setTimeout(r, 90));
  await report();
}
process.exit(0);
