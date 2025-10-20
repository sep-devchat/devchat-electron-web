const { Notification } = require("electron");
const { getMainWindow } = require("../../app/state");

/**
 *
 * @param {Electron.IpcMainEvent} e
 * @param {*} title
 * @param {*} body
 */
const showMessageNotification = (e, title, body) => {
  const notification = new Notification({
    title: title,
    body: body,
  });

  notification.on("click", () => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  notification.show();
};

module.exports = showMessageNotification;
