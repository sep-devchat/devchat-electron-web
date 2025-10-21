const path = require("path");
const { getMainWindow, createMainWindow, setMainWindow } = require("./state");

function getIconPath() {
  const base = path.join(__dirname, "../..", "images/icons");
  if (process.platform === "win32") return path.join(base, "devchat-logo.ico");
  if (process.platform === "darwin")
    return path.join(base, "devchat-logo.icns");
  return path.join(base, "devchat-logo.png");
}

function showApp() {
  let win = getMainWindow();
  if (!win) {
    win = createMainWindow();
    setMainWindow(win);
  }
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
}

module.exports = { getIconPath, showApp };
