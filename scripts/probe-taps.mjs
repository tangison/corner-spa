// Probe: measure tap targets and pseudo-overlay computed styles on the live page.
// Reuses the taste-skill launch pattern (chrome --remote-debugging-port=0 + Node WebSocket).
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = process.env.CHROME_PATH || "/home/z/.cache/puppeteer/chrome/linux-156.0.8078.47/chrome-linux64/chrome";
const URL_TO_CHECK = process.argv[2] || "http://localhost:3000/";
const dir = mkdtempSync(join(tmpdir(), "probe-"));
const proc = spawn(CHROME, [
  "--headless=new", "--remote-debugging-port=0", `--user-data-dir=${dir}`,
  "--no-first-run", "--no-default-browser-check", "--no-sandbox", "about:blank",
], { stdio: ["pipe", "pipe", "pipe"] });
proc.stderr.on("data", (d) => {
  const m = String(d).match(/DevTools listening on (ws:\/\/\S+)/);
  if (!m) return;
  probe(m[1]);
});
process.on("exit", () => { try { proc.kill("SIGKILL"); } catch {} });

async function probe(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) => new Promise((res) => {
    const mid = ++id;
    pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  };
  await new Promise((r) => (ws.onopen = r));
  const { targetInfos } = await send("Target.getTargets");
  const page = targetInfos.find((t) => t.type === "page");
  const { sessionId } = await send("Target.attachToTarget", { targetId: page.targetId, flatten: true });
  const cdp = (method, params) => send("Target.sendMessageToTarget", { targetId: page.targetId, sessionId, message: JSON.stringify({ id: ++id, method, params }) });
  // note: flatten messages come back on the same socket with sessionId
  pending.clear();
  const raw = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && raw.has(msg.id)) { raw.get(msg.id)(msg.result); raw.delete(msg.id); }
  };
  const call = async (method, params = {}) => {
    const mid = Math.floor(Math.random() * 1e9);
    return new Promise((res) => {
      raw.set(mid, res);
      ws.send(JSON.stringify({ sessionId, id: mid, method, params }));
    });
  };
  await call("Page.enable");
  await call("Runtime.enable");
  await call("Emulation.setDeviceMetricsOverride", { width: 320, height: 640, deviceScaleFactor: 2, mobile: true });
  await call("Page.navigate", { url: URL_TO_CHECK });
  await new Promise((r) => setTimeout(r, 3500));

  const expr = `(() => {
    const out = [];
    const q = (sel) => document.querySelector(sel);
    const inspect = (el, label) => {
      if (!el) { out.push(label + ": NOT FOUND"); return; }
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const after = getComputedStyle(el, "::after");
      const before = getComputedStyle(el, "::before");
      out.push(JSON.stringify({
        label,
        rect: { w: Math.round(r.width), h: Math.round(r.height) },
        position: cs.position,
        display: cs.display,
        afterContent: after.content,
        afterPos: after.position,
        afterTop: after.top,
        afterBottom: after.bottom,
        beforeTop: before.top,
        beforePos: before.position,
      }));
    };
    inspect(q("a.brand"), "brand");
    inspect(q("footer.site nav.foot-nav a"), "foot-nav a");
    inspect(q("span.foot-social-group a"), "social a");
    inspect(q(".row .row-name"), "row-name");
    const notes = [...document.querySelectorAll("p.note a")];
    inspect(notes[0], "note a[0]");
    inspect(q(".a2"), "a2");
    inspect(q("a.foot-tel"), "foot-tel");
    return out.join("\\n");
  })()`;
  const res = await call("Runtime.evaluate", { expression: expr, returnByValue: true });
  console.log(res.result.value);
  process.exit(0);
}
