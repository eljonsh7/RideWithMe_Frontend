<template>
  <CustomModal @close-modal="this.$emit('close-modal')">
    <div class="px-4 mb-2 font-semibold">Notifications</div>
    <div
      class="overflow-y-auto gap-y-1 flex flex-col"
      style="max-height: 400px"
    >
      <div v-for="notification in this.notifications" :key="notification.id">
        <div class="hover:bg-black/10 py-2 cursor-default px-4 rounded border">
          {{ formatString(notification.sender, notification.type) }}
        </div>
      </div>

      <div
        v-if="notifications.length === 0"
        class="text-xs font-semibold text-black/50"
      >
        No notifications for you.
      </div>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "@/layouts/ui/CustomModal.vue";

import Notification from "@/services/notification";

export default {
  name: "NotificationsModal",
  components: { CustomModal },
  beforeMount() {
    this.getNotifications();
  },
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    async getNotifications() {
      if (sessionStorage.getItem("token")) {
        const response = await Notification.getNotifications(
          this.$store.getters["users/getToken"]
        );
        this.notifications = response.notifications;
      }
    },
    formatString(sender, string) {
      const senderName = `${sender.first_name} ${sender.last_name}`;
      switch (string) {
        case "routeReservationRequested":
          return `${senderName} requested reservation.`;
        case "routeReservationCancelled":
          return `${senderName} cancelled route reservation.`;
        case "friendRequestDeclined":
          return `${senderName} declined friend request.`;
        case "friendRequestSent":
          return `${senderName} sent you a friend request.`;
        case "friendRequestAccepted":
          return `${senderName} accepted your friend request.`;
      }
    },
  },
};
</script>
