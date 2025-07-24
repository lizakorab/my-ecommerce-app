import { createApp } from "vue";
import "@/styles/style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import { createRouter, createWebHistory } from "vue-router";
import router from "@/routes";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

app.use(router);

const pinia = createPinia();
app.use(pinia);

app.mount("#app");
