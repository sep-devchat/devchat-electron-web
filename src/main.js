// App lifecycle orchestration: handleSquirrelEvent -> init -> run -> quit
const {
  handleSquirrelEvent,
  initApp,
  runApp,
  setupQuitHandlers,
} = require("./app/lifecycle");

// Handle squirrel events immediately
if (require("electron-squirrel-startup")) return;
handleSquirrelEvent();

// Register quit handlers immediately
setupQuitHandlers();

// Initialize the app (create window, init deep links, init native APIs), then run
initApp().then(() => {
  runApp();
});
