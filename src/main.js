// App lifecycle orchestration: init -> run -> quit
const { initApp, runApp, setupQuitHandlers } = require("./app/lifecycle");

// Register quit handlers immediately
setupQuitHandlers();

// Initialize the app (create window, init deep links, init native APIs), then run
initApp().then(() => {
  runApp();
});
