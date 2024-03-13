import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomePage },
        { path: "/:notFound(.*)", component: NotFound },
    ],
});

export default router;
