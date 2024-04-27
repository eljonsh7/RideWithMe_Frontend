import { createRouter, createWebHistory } from "vue-router";

// Admin Routes
import AdminLoginPage from "./admin/views/AdminLoginPage.vue";
import AdminHomePage from "./admin/views/AdminHomePage.vue";
import AdminUsersPage from "./admin/views/AdminUsersPage.vue";
import AdminCarsPage from "./admin/views/AdminCarsPage.vue";
import AdminCitiesPage from "./admin/views/AdminCitiesPage.vue";

// User Routes
import HomePage from "./views/HomePage.vue";
import NotFound from "./views/NotFound.vue";
import LogIn from "./views/LogIn.vue";
import RegisterPage from "./views/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage, name: "home" },
    { path: "/login", component: LogIn, name: "login" },
    { path: "/register", component: RegisterPage, name: "register" },
    { path: "/admin/login", component: AdminLoginPage, name: "adminLogin" },
    { path: "/admin/home", component: AdminHomePage, name: "adminHome" },
    { path: "/admin/users", component: AdminUsersPage, name: "adminUsers" },
    { path: "/admin/cars", component: AdminCarsPage, name: "adminCars" },
    { path: "/admin/cities", component: AdminCitiesPage, name: "adminCities" },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;