const { Notification } = require("electron");
const { showApp } = require("../../app/utils");

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
    showApp();

    e.sender.send("notification-clicked", message);
  });

  notification.show();
};

module.exports = showMessageNotification;
