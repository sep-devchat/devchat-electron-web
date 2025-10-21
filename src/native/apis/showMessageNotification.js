const { Notification } = require("electron");
const { getMainWindow } = require("../../app/state");

/**
 *
 * @param {Electron.IpcMainEvent} e
 * @param {*} title
 * @param {*} body
 */
const showMessageNotification = (e, message) => {
  const notification = new Notification({
    title: message.sender.firstName + " " + message.sender.lastName,
    body: message.content || "You have a new message.",
    icon: message.sender.avatarUrl,
  });

  notification.on("click", () => {
    const mainWindow = getMainWindow();
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  notification.on("click", () => {
    e.sender.send("notification-clicked", message);
  });

  notification.show();
};

module.exports = showMessageNotification;
