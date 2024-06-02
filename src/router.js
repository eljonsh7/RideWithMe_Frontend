import { createRouter, createWebHistory } from "vue-router";

// Admin Routes
import AdminHomePage from "./admin/views/AdminHomePage.vue";
import AdminUsersPage from "./admin/views/AdminUsersPage.vue";
import AdminCarsPage from "./admin/views/AdminCarsPage.vue";
import AdminCitiesPage from "./admin/views/AdminCitiesPage.vue";

// User Routes
import HomePage from "./views/guest/HomePage.vue";
import AboutUs from "./views/guest/AboutUs.vue";
import ProfilePage from "./views/auth/ProfilePage.vue";
import PublicProfilesPage from "./views/auth/PublicProfilesPage.vue";
import ChatPage from "./views/auth/ChatPage.vue";
import ReservationsPage from "./views/auth/ReservationsPage.vue";
import NotFound from "./views/guest/NotFound.vue";
import LogIn from "./views/guest/LogIn.vue";
import RegisterPage from "./views/guest/RegisterPage.vue";
import RouteDetails from "./views/auth/RouteDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: HomePage, name: "home" },
    { path: "/profile", component: ProfilePage, name: "profile" },
    { path: "/about-us", component: AboutUs, name: "about-us" },
    {
      path: "/profile/:user_id",
      component: PublicProfilesPage,
      name: "publicProfile",
      props: true,
    },
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
      path: "/route/:routeId",
      component: RouteDetails,
      name: "routeDetails",
      props: true,
    },
  ],
});

export default router;
