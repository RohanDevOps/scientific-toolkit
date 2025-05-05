import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content: string, path: string) => ipcRenderer.invoke('save-file', content, path),
  // Add other API methods as needed
});