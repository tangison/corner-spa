// Probe: scroll to the iris/towel figure and the breath image, then sample pixels.
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME_PATH || "/home/z/.cache/puppeteer/chrome/linux-156.0.8078.47/chrome-linux64/chrome";
const URL_TO_CHECK = process.argv[2] || "http://localhost:3000/";
const dir = mkdtempSync(join(tmpdir(), "probe-"));
const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${dir}`,
  "--no-first-run", "--no-default-browser-check", "--no-sandbox", "--use-angle=swiftshader", "about:blank",
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
const send = (method, params = {}) => new Promise((res) => {
  const id = ++seq;
  raw.set(id, res);
  ws.send(JSON.stringify({ sessionId: params.__sid, id, method, params }));
});
const { targetInfos } = await send("Target.getTargets");
const page = targetInfos.find((t) => t.type === "page");
const att = await send("Target.attachToTarget", { targetId: page.targetId, flatten: true });
const sid = att.sessionId;
const call = (method, params = {}) => new Promise((res) => {
  const id = ++seq;
  raw.set(id, res);
  ws.send(JSON.stringify({ sessionId: sid, id, method, params }));
});

await call("Page.enable");
await call("Runtime.enable");
await call("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await call("Page.navigate", { url: URL_TO_CHECK });
await new Promise((r) => setTimeout(r, 4500));

const evalJs = async (expr) => {
  const res = await call("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return res && res.result ? res.result.value : JSON.stringify(res);
};

// scroll to the towel figure slowly (so the iris reveal fires), then sample
const result = await evalJs(`(async () => {
  const img = document.querySelector('.g figure.c img.c');
  if (!img) return 'no img';
  img.scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 300));
  window.scrollBy({ top: 120 });
  await new Promise(r => setTimeout(r, 700));
  window.scrollBy({ top: -60 });
  await new Promise(r => setTimeout(r, 900));
  const r = img.getBoundingClientRect();
  const c = document.createElement('canvas');
  c.width = 8; c.height = 8;
  const ok = r.width > 5 && r.height > 5;
  let px = 'n/a';
  if (ok) {
    const ctx2 = c.getContext('2d');
    ctx2.drawImage(img, 0, 0, 8, 8);
    const d = ctx2.getImageData(0, 0, 8, 8).data;
    let distinct = new Set();
    for (let i = 0; i < d.length; i += 4) distinct.add(d[i] + ',' + d[i+1] + ',' + d[i+2]);
    px = distinct.size + ' distinct colours in 8x8 sample';
  }
  return JSON.stringify({ w: Math.round(r.width), h: Math.round(r.height), clip: getComputedStyle(img).clipPath, px });
})()`);
console.log("towel:", result);

// breath image
const result2 = await evalJs(`(async () => {
  const img = document.querySelector('.breath img.full');
  if (!img) return 'no img';
  img.scrollIntoView({ block: 'center' });
  await new Promise(r => setTimeout(r, 900));
  const r = img.getBoundingClientRect();
  const c = document.createElement('canvas');
  c.width = 8; c.height = 8;
  const ctx2 = c.getContext('2d');
  try { ctx2.drawImage(img, 0, 0, 8, 8); } catch (e) { return 'draw error ' + e.message; }
  const d = ctx2.getImageData(0, 0, 8, 8).data;
  let distinct = new Set();
  for (let i = 0; i < d.length; i += 4) distinct.add(d[i] + ',' + d[i+1] + ',' + d[i+2]);
  return JSON.stringify({ w: Math.round(r.width), h: Math.round(r.height), px: distinct.size + ' distinct colours' });
})()`);
console.log("breath:", result2);
process.exit(0);
