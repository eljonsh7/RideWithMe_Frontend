<template>
  <BaseLoader v-if="isLoading" />
  <div v-else class="h-full">
    <div v-if="shouldHideComponent" class="flex w-full h-full flex-col">
      <NavBar @unbind-channel="unbindChannel" />
      <RouterView />
    </div>
    <div
      v-else-if="shouldHideAdminComponent"
      class="w-full h-full flex flex-col md:flex-row"
    >
      <AdminNavBar @unbind-channel="unbindChannel" />
      <RouterView />
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<script>
import NavBar from "./layouts/ui/NavBar.vue";
import AdminNavBar from "./admin/layouts/AdminNavBar.vue";
import BaseLoader from "@/components/general/BaseLoader.vue";

import Pusher from "pusher-js";
import Toast from "@/utils/toast";

export default {
  name: "App",
  components: {
    BaseLoader,
    NavBar,
    AdminNavBar,
  },
  data() {
    return {
      isLoading: false,
      user: {},
      pusher: null,
      channel: null,
    };
  },
  watch: {
    $route() {
      this.getUser();
    },
  },
  computed: {
    shouldHideAdminComponent() {
      const routesWithoutAdminComponent = [
        "login",
        "register",
        "home",
        "profile",
        "reservations",
        "chat",
        "routeDetails",
      ];
      return !routesWithoutAdminComponent.includes(this.$route.name);
    },
    shouldHideComponent() {
      const routesWithoutComponent = [
        "login",
        "register",
        "adminHome",
        "adminUsers",
        "adminCars",
        "adminCities",
      ];
      return !routesWithoutComponent.includes(this.$route.name);
    },
  },
  async created() {
    this.isLoading = true;
    await this.getUser();
    this.isLoading = false;
    if (sessionStorage.getItem("token"))
      this.createPusher(
        this.$store.getters["users/getUser"].id,
        sessionStorage.getItem("token")
      );
  },
  methods: {
    async getUser() {
      if (sessionStorage.getItem("token")) {
        this.user = await this.$store.dispatch(
          "users/getUserByToken",
          sessionStorage.getItem("token")
        );
      }
    },
    createPusher(userId, token) {
      this.pusher = null;
      this.pusher = new Pusher(process.env.VUE_APP_PUSHER_KEY, {
        appId: process.env.VUE_APP_PUSHER_APP_ID,
        key: process.env.VUE_APP_PUSHER_KEY,
        secret: process.env.VUE_APP_PUSHER_SECRET,
        cluster: "eu",
        useTLS: true,
        channelAuthorization: {
          endpoint: `http://172.20.10.2:8000/broadcasting/auth`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      this.channel = null;
      this.channel = this.pusher.subscribe(`private-user.${userId}`);
      this.bindChannel();
    },
    bindChannel() {
      this.channel.unbind("NewMessage");
      this.channel.bind("NewMessage", async (e) => {
        console.log(e);
        const event = new CustomEvent(`new-${e.conversation_type}-message`, {
          detail: e,
        });
        window.dispatchEvent(event);
      });
      this.channel.bind("NotificationEvent", async (e) => {
        Toast.showInfo(e.notificationEventData.message);
      });
    },
    unbindChannel() {
      if (this.channel) this.channel.unbind("NewMessage");
    },
  },
};
</script>

<style>
@font-face {
  font-family: "SFPro";
  src: url("assets/fonts/regularSfPro.OTF") format("opentype");
}

* {
  font-family: "SFPro", "Franklin Gothic Book", serif;
  letter-spacing: 0.025em;
}
</style>
