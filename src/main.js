import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import About from "./components/About.vue";
import Home from "./components/Home.vue";
import Slider1 from "./components/slider1/Slider1.vue";
import App from "./App.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/slider1", component: Slider1 },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
