import Store from "electron-store";

const store = new Store({
  defaults: {
    app: {
      appBaseUrl: "https://devchat.online",
    },
  },
});

export default store;
