import { createRouter, createWebHistory } from "vue-router";

// Admin Routes
import AdminHomePage from "./admin/views/AdminHomePage.vue";
import AdminUsersPage from "./admin/views/AdminUsersPage.vue";
import AdminCarsPage from "./admin/views/AdminCarsPage.vue";
import AdminCitiesPage from "./admin/views/AdminCitiesPage.vue";

// User Routes
import HomePage from "./views/HomePage.vue";
import ProfilePage from "./views/ProfilePage.vue";
import ChatPage from "./views/ChatPage.vue";
import ReservationsPage from "./views/ReservationsPage.vue";
import NotFound from "./views/NotFound.vue";
import LogIn from "./views/LogIn.vue";
import RegisterPage from "./views/RegisterPage.vue";
import RouteDetails from "./views/RouteDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage, name: "home" },
    { path: "/profile", component: ProfilePage, name: "profile" },
    {
      path: "/reservations",
      component: ReservationsPage,
      name: "reservations",
    },
    { path: "/chat", component: ChatPage, name: "chat" },
    { path: "/login", component: LogIn, name: "login" },
    { path: "/register", component: RegisterPage, name: "register" },
    { path: "/admin/home", component: AdminHomePage, name: "adminHome" },
    { path: "/admin/users", component: AdminUsersPage, name: "adminUsers" },
    { path: "/admin/cars", component: AdminCarsPage, name: "adminCars" },
    { path: "/admin/cities", component: AdminCitiesPage, name: "adminCities" },
    { path: "/:notFound(.*)", component: NotFound },
    {
      path: "/route/:route_id",
      component: RouteDetails,
      name: "RouteDetails",
      props: true,
    },
  ],
});

export default router;
