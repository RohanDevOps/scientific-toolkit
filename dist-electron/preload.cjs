"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (content, path) => electron.ipcRenderer.invoke("save-file", content, path)
  // Add other API methods as needed
});
