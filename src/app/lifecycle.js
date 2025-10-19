const { app, BrowserWindow } = require("electron");

// Modules for separated concerns
const { ensureSingleInstance, registerProtocol, onDeepLink, parseDeepLink, maybeHandleInitialDeepLink } = require("./protocol");
const { setupAutoUpdater } = require("./updates");
const { registerNativeAPIs } = require("./native-ipc");
const { setMainWindow, getMainWindow, createMainWindow, getForceQuit, setForceQuit } = require("./state");
const createTray = require("./tray");

// PHASE: INIT
async function initApp() {
  // updater first so it can check on boot
  setupAutoUpdater();

  // Ensure single instance and protocol registration before ready
  ensureSingleInstance();
  registerProtocol();

  await app.whenReady();

  // Native IPC handlers
  registerNativeAPIs();

  // Create main window
  const win = createMainWindow();
  setMainWindow(win);
  // initialize tray after first window is ready
  try { createTray(); } catch (e) { console.warn("Tray init failed:", e?.message || e); }

  // Minimize-to-tray behavior: hide window on close unless we are force quitting
  win.on("close", (e) => {
    if (getForceQuit()) return; // allow close on real quit
    e.preventDefault();
    win.hide();
  });

  // Handle initial deep link via argv (Windows/Linux) once ready
  maybeHandleInitialDeepLink(process.argv);

  // Deep link handling
  app.on("open-url", (event, url) => {
    event?.preventDefault?.();
    onDeepLink(url);
  });

  // macOS: recreate window when dock icon is clicked
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const w = createMainWindow();
      setMainWindow(w);
    }
  });
}

// PHASE: RUN
function runApp() {
  // Nothing special yet; the app is running once init completed.
  // If there was a pending deep link captured before window creation, deliver now.
  const win = getMainWindow();
  if (!win) return;

  // no-op: placeholders for future runtime hooks
}

// PHASE: QUIT
function setupQuitHandlers() {
  // When quitting, set flag to allow window to close
  app.on("before-quit", () => {
    setForceQuit(true);
  });
  app.on("window-all-closed", () => {
    // Do not quit on Windows/Linux either; keep app running in tray
    // On macOS, standard is to keep app active; same behavior for all
    // No-op here to keep background/tray alive
  });
}

module.exports = { initApp, runApp, setupQuitHandlers };
