const { ipcMain } = require("electron");
const nativeAPI = require("../native/nativeAPI");

function registerNativeAPIs() {
  Object.entries(nativeAPI).forEach(([key, val]) => ipcMain.handle(key, val));
}

module.exports = { registerNativeAPIs };
