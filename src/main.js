import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

import About from "./components/About.vue";
import Home from "./components/Home.vue";
import App from "./App.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
