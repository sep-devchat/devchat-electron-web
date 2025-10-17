const { updateElectronApp, UpdateSourceType } = require("update-electron-app");

updateElectronApp({
  updateSource: {
    type: UpdateSourceType.ElectronPublicUpdateService,
    repo: "sep-devchat/devchat-web-electron",
  },
  updateInterval: "1 hour",
});

const { ipcMain } = require("electron");
const { app, BrowserWindow } = require("electron/main");
const path = require("path");
const nativeAPI = require("./native/nativeAPI");

let mainWindow;
const SCHEME = "devchat";

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(SCHEME, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(SCHEME);
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("src/front/index.html");

  mainWindow.maximize();
};

function parseDeepLink(url) {
  let code = "";
  try {
    const u = new URL(url);
    if (u.protocol.replace(/:$/, "") === SCHEME) {
      code = u.searchParams.get("code") ?? "";
    }
  } catch (err) {
    console.warn("Failed to parse deep link", url, err);
  }
  return { url, code };
}

function handleDeepLink(url) {
  const payload = parseDeepLink(url);
  //   console.log("Deep link received:", payload);
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    // Send structured payload { url, code }
    mainWindow.webContents.send("deep-link", payload);
  } else {
    pendingDeepLink = payload;
  }
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    // the commandLine is array of strings in which last element is deep link url
    handleDeepLink(commandLine.pop());
  });

  // Create mainWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    Object.entries(nativeAPI).forEach(([key, val]) => ipcMain.handle(key, val));

    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });

    app.on("open-url", (event, url) => {
      handleDeepLink(url);
    });
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
