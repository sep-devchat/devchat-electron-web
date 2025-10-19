const { app, Menu, Tray, nativeImage, Notification } = require("electron");
const path = require("path");
const { getMainWindow, setMainWindow, createMainWindow, setForceQuit } = require("./state");

let tray = null; // keep a reference to avoid GC

function getIconPath() {
    const base = path.join(__dirname, "../..", "icons");
    if (process.platform === "win32") return path.join(base, "devchat-logo.ico");
    if (process.platform === "darwin") return path.join(base, "devchat-logo.icns");
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
                    subtitle: "This is a subtitle",
                    body: "This is a test notification",
                    icon: iconPath,
                });

                notification.on("click", () => {
                    new Notification({
                        title: "Notification Clicked",
                        subtitle: "This is a subtitle",
                        body: "You clicked the notification!",
                        icon: iconPath,
                    }).show()
                })

                notification.show();
            },
        },
        { type: "separator" },
        {
            label: process.platform === "darwin" ? "Quit DevChat" : "Exit DevChat",
            click: () => { setForceQuit(true); app.quit(); },
        },
    ]);

    tray.setContextMenu(contextMenu);
    // Quick open on tray icon click
    tray.on("click", () => showApp());

    return tray;
}

module.exports = createTray;