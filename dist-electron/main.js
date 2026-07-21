import { app as o, BrowserWindow as i, ipcMain as m, dialog as f } from "electron";
import { fileURLToPath as _ } from "node:url";
import n from "node:path";
import R from "node:fs";
const s = n.dirname(_(import.meta.url));
process.env.APP_ROOT = n.join(s, "..");
const t = process.env.VITE_DEV_SERVER_URL, h = n.join(process.env.APP_ROOT, "dist-electron"), r = n.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? n.join(process.env.APP_ROOT, "public") : r;
let e;
function l() {
  e = new i({
    icon: n.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: n.join(s, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t ? e.loadURL(t) : e.loadFile(n.join(r, "index.html"));
}
o.on("window-all-closed", () => {
  process.platform !== "darwin" && (o.quit(), e = null);
});
o.on("activate", () => {
  i.getAllWindows().length === 0 && l();
});
o.whenReady().then(l);
m.handle("salvar-imagem", async (w, c, p) => {
  const { filePath: a } = await f.showSaveDialog({
    title: "Salvar Cronograma",
    defaultPath: p,
    filters: [{ name: "Imagens PNG", extensions: ["png"] }]
  });
  if (a) {
    const d = c.replace(/^data:image\/png;base64,/, "");
    return R.writeFileSync(a, d, "base64"), !0;
  }
  return !1;
});
export {
  h as MAIN_DIST,
  r as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};
