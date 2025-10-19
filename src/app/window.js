const { BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "..", "front", "index.html"));
  mainWindow.maximize();

  return mainWindow;
}

module.exports = { createWindow };
