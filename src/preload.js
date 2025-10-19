const { contextBridge, ipcRenderer } = require("electron");

const nativeAPINames = [
  "openBrowserForLogin",
  "showMessageNotification",
];

const api = {};
for (const name of nativeAPINames) {
  api[name] = (...args) => ipcRenderer.invoke(name, ...args);
}

contextBridge.exposeInMainWorld("nativeAPI", {
  nativeAPICallback: (channel, cb) => {
    ipcRenderer.on(channel, cb);
    return () => ipcRenderer.off(channel, cb);
  },
  ...api,
});
