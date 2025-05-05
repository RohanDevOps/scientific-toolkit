"use strict";
const electron = require("electron");
const path = require("path");
const url = require("url");
var _documentCurrentScript = typeof document !== "undefined" ? document.currentScript : null;
const __dirname$1 = url.fileURLToPath(new URL(".", typeof document === "undefined" ? require("url").pathToFileURL(__filename).href : _documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === "SCRIPT" && _documentCurrentScript.src || new URL("main.cjs", document.baseURI).href));
{
  if (process.platform === "win32") {
    electron.app.setAppUserModelId(process.execPath);
  }
}
const createWindow = () => {
  const mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.cjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
    mainWindow.webContents.openDevTools();
  }
};
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("save-file", async (_event, content, path2) => {
  return { success: true, path: path2 };
});
