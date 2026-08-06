import { app as n, BrowserWindow as t, ipcMain as g, dialog as P } from "electron";
import { fileURLToPath as f } from "node:url";
import o from "node:path";
import w from "node:fs";
n.disableHardwareAcceleration();
n.setAppUserModelId("com.cronograma.iasd");
const r = o.dirname(f(import.meta.url));
process.env.APP_ROOT = o.join(r, "..");
const a = process.env.VITE_DEV_SERVER_URL, v = o.join(process.env.APP_ROOT, "dist-electron"), l = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = a ? o.join(process.env.APP_ROOT, "public") : l;
let e;
function c() {
  const i = n.isPackaged ? o.join(process.resourcesPath, "public", "logoapp.png") : o.join(process.env.APP_ROOT, "public", "logoapp.png");
  e = new t({
    width: 1200,
    height: 800,
    title: "Cronograma IASD",
    icon: i,
    webPreferences: {
      preload: o.join(r, "preload.mjs")
    }
  }), e.setMenu(null), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  }), a ? e.loadURL(a) : e.loadFile(o.join(l, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && c();
});
n.whenReady().then(c);
g.handle("salvar-imagem", async (i, p, d) => {
  const { filePath: s } = await P.showSaveDialog({
    title: "Salvar Cronograma",
    defaultPath: d,
    filters: [{ name: "Imagens PNG", extensions: ["png"] }]
  });
  if (s) {
    const m = p.replace(/^data:image\/png;base64,/, "");
    return w.writeFileSync(s, m, "base64"), !0;
  }
  return !1;
});
export {
  v as MAIN_DIST,
  l as RENDERER_DIST,
  a as VITE_DEV_SERVER_URL
};
