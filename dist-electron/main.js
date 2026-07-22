import { app as n, BrowserWindow as t, ipcMain as P, dialog as f } from "electron";
import { fileURLToPath as w } from "node:url";
import o from "node:path";
import r from "node:fs";
n.disableHardwareAcceleration();
n.setAppUserModelId("com.cronograma.iasd");
const l = o.dirname(w(import.meta.url));
process.env.APP_ROOT = o.join(l, "..");
const s = process.env.VITE_DEV_SERVER_URL, E = o.join(process.env.APP_ROOT, "dist-electron"), c = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? o.join(process.env.APP_ROOT, "public") : c;
let e;
function p() {
  const a = n.isPackaged ? o.join(process.resourcesPath, "public", "logoapp.png") : o.join(process.env.APP_ROOT, "public", "logoapp.png");
  console.log("Ícone:", a), console.log("Existe:", r.existsSync(a)), e = new t({
    width: 1200,
    height: 800,
    title: "Cronograma IASD",
    icon: a,
    webPreferences: {
      preload: o.join(l, "preload.mjs")
    }
  }), e.setMenu(null), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  }), s ? e.loadURL(s) : e.loadFile(o.join(c, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && p();
});
n.whenReady().then(p);
P.handle("salvar-imagem", async (a, d, m) => {
  const { filePath: i } = await f.showSaveDialog({
    title: "Salvar Cronograma",
    defaultPath: m,
    filters: [{ name: "Imagens PNG", extensions: ["png"] }]
  });
  if (i) {
    const g = d.replace(/^data:image\/png;base64,/, "");
    return r.writeFileSync(i, g, "base64"), !0;
  }
  return !1;
});
export {
  E as MAIN_DIST,
  c as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
