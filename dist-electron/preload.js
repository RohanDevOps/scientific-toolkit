"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electronAPI",{saveFile:(r,i)=>e.ipcRenderer.invoke("save-file",r,i)});
