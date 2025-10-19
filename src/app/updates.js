const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
// const { getIconPath } = require("./utils");
// const { Notification } = require("electron");

function setupAutoUpdater() {
  try {
    updateElectronApp({
      updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: "sep-devchat/devchat-web-electron",
      },
      updateInterval: "1 hour",
    //   onNotifyUser: (info) => {
    //     const notification = new Notification({
    //         title: "Update Available",
    //         body: `A new version (${info.version}) is available. It will be downloaded in the background.`,
    //         icon: getIconPath(),
    //     });

    //     notification.show();
    //   }
    });
  } catch (err) {
    console.warn("Auto updater setup failed:", err?.message || err);
  }
}

module.exports = { setupAutoUpdater };
