const { updateElectronApp, UpdateSourceType } = require("update-electron-app");

function setupAutoUpdater() {
  try {
    updateElectronApp({
      updateSource: {
        type: UpdateSourceType.ElectronPublicUpdateService,
        repo: "sep-devchat/devchat-web-electron",
      },
      updateInterval: "1 hour",
    });
  } catch (err) {
    console.warn("Auto updater setup failed:", err?.message || err);
  }
}

module.exports = { setupAutoUpdater };
