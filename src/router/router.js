import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import NotFound from "../views/NotFound.vue";
import LogIn from "@/views/LogIn.vue";
import RegisterPage from "@/views/RegisterPage.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomePage },
        { path: "/login", component: LogIn },
        { path: "/register", component: RegisterPage},
        { path: "/:notFound(.*)", component: NotFound },
    ],
});

export default router;
