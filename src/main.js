import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import "./index.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 4,
  newestOnTop: true,
});

app.use(router);
app.use(store);

app.mount("#app");
