const { app, Menu, Tray, nativeImage, Notification } = require("electron");
const { setForceQuit } = require("./state");
const { getIconPath, showApp } = require("./utils");

let tray = null; // keep a reference to avoid GC

function createTray() {
  if (tray) return tray; // idempotent

  const iconPath = getIconPath();
  const image = nativeImage.createFromPath(iconPath);
  tray = new Tray(image);
  tray.setToolTip("DevChat");

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open App",
      click: () => showApp(),
    },
    {
      label: "Test Notification",
      click: () => {
        const notification = new Notification({
          title: "Test Notification",
          body: "This is a test notification",
          icon: iconPath,
        });

        notification.on("click", () => {
          new Notification({
            title: "Notification Clicked",
            subtitle: "This is a subtitle",
            body: "You clicked the notification!",
            icon: iconPath,
          }).show();
        });

        notification.show();
      },
    },
    { type: "separator" },
    {
      label: process.platform === "darwin" ? "Quit DevChat" : "Exit DevChat",
      click: () => {
        setForceQuit(true);
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
  // Quick open on tray icon click
  tray.on("click", () => showApp());

  return tray;
}

module.exports = createTray;
