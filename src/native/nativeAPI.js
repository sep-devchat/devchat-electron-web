const openBrowserForLogin = require("./apis/openBrowserForLogin");
const showMessageNotification = require("./apis/showMessageNotification");

const nativeAPI = {
  openBrowserForLogin,
  showMessageNotification
};

module.exports = nativeAPI;
