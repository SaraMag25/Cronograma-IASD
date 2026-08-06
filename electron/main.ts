import { app, BrowserWindow, ipcMain, dialog, } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs' 

app.disableHardwareAcceleration()

app.setAppUserModelId('com.cronograma.iasd'); 

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {

  const iconPath = app.isPackaged
  ? path.join(process.resourcesPath, "public", "logoapp.png")
  : path.join(process.env.APP_ROOT!, "public", "logoapp.png");


win = new BrowserWindow({
  width: 1200,
  height: 800,
  title: "Cronograma IASD",
  icon: iconPath,
  webPreferences: {
    preload: path.join(__dirname, "preload.mjs"),
  },
});

  win.setMenu(null);

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

ipcMain.handle('salvar-imagem', async (_event, dataUrl, nomeArquivo) => {
  const { filePath } = await dialog.showSaveDialog({
    title: 'Salvar Cronograma',
    defaultPath: nomeArquivo,
    filters: [{ name: 'Imagens PNG', extensions: ['png'] }]
  });

  if (filePath) {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(filePath, base64Data, 'base64');
    return true;
  }
  return false;
});