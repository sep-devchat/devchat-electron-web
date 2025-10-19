const { Notification } = require("electron");


const showMessageNotification = (e, title, body) => {
    const notification = new Notification({
        title: title,
        body: body,
    });

    notification.show();
}

module.exports = showMessageNotification;