const path = require("path");

function getIconPath() {
    const base = path.join(__dirname, "../..", "icons");
    if (process.platform === "win32") return path.join(base, "devchat-logo.ico");
    if (process.platform === "darwin") return path.join(base, "devchat-logo.icns");
    return path.join(base, "devchat-logo.png");
}

module.exports = { getIconPath };