import { app, BrowserWindow, ipcMain, dialog } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
app.disableHardwareAcceleration();
app.setAppUserModelId("com.cronograma.iasd");
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  const iconPath = app.isPackaged ? path.join(process.resourcesPath, "public", "logoapp.png") : path.join(process.env.APP_ROOT, "public", "logoapp.png");
  console.log("Ícone:", iconPath);
  console.log("Existe:", fs.existsSync(iconPath));
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Cronograma IASD",
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs")
    }
  });
  win.setMenu(null);
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
ipcMain.handle("salvar-imagem", async (_event, dataUrl, nomeArquivo) => {
  const { filePath } = await dialog.showSaveDialog({
    title: "Salvar Cronograma",
    defaultPath: nomeArquivo,
    filters: [{ name: "Imagens PNG", extensions: ["png"] }]
  });
  if (filePath) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(filePath, base64Data, "base64");
    return true;
  }
  return false;
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
