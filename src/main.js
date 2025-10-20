// App lifecycle orchestration: handleSquirrelEvent -> init -> run -> quit
const { initApp, runApp, setupQuitHandlers } = require("./app/lifecycle");

// Handle squirrel events immediately
if (require("electron-squirrel-startup")) return;

// Register quit handlers immediately
setupQuitHandlers();

// Initialize the app (create window, init deep links, init native APIs), then run
initApp().then(() => {
  runApp();
});
