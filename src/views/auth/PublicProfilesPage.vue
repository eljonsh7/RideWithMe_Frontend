<template>
  <BaseLoader v-if="isLoading" />
  <div v-else>
    <div class="h-0 w-full mb-10">
      <div class="bg-black/50 h-44"></div>
    </div>
    <div class="flex flex-col justify-center items-center p-5 gap-4">
      <div>
        <img
          :src="imageSource"
          alt="."
          class="border-2 border-black/50 rounded-full w-48 aspect-square object-cover bg-white"
        />
      </div>
      <div class="flex-col flex gap-2 items-center">
        <div class="text-2xl font-bold">{{ fullName }}</div>
        <div class="flex justify-center w-48">
          <StarIcon
            v-for="starIndex in 5"
            :key="starIndex"
            :color="calculateStarColor(starIndex)"
            :type="calculateStarType(starIndex)"
            class="w-8 mx-1 my-2"
            strokeColor="black"
          ></StarIcon>
        </div>
      </div>
      <div class="rounded-lg w-48 flex text-center p-1 gap-2 text-sm">
        <div
          v-if="!user.isFriend"
          class="bg-black w-full py-1 cursor-pointer rounded-lg text-white"
          @click="sendFriendRequest"
        >
          Add Friend
        </div>
        <div
          v-if="user.isFriend && user.isFriend.status == 'pending'"
          class="bg-black w-full py-1 cursor-pointer rounded-lg text-white"
          @click="handleCancelAcceptReq()"
        >
          {{
            !user.isFriend.sending
              ? "Accept"
              : "Request " + user.isFriend.status
          }}
        </div>
        <div
          v-if="
            user.isFriend &&
            user.isFriend.status === 'pending' &&
            !user.isFriend.sending
          "
          class="bg-gray-300 w-full py-1 cursor-pointer rounded-lg text-black"
          @click="declineFriendRequest()"
        >
          Decline
        </div>
        <div
          v-if="user.isFriend && user.isFriend.status === 'accepted'"
          class="bg-black w-full py-1 cursor-pointer rounded-lg text-white"
          @click="
            messageModal = true;
            moreOptions = false;
          "
        >
          Message
        </div>
        <div class="flex-col flex">
          <div
            class="bg-black w-8 py-1 cursor-pointer rounded-lg text-white flex justify-center"
          >
            <BottomArrowIcon
              @click="moreOptions = !moreOptions"
            ></BottomArrowIcon>
          </div>
          <div class="h-0 w-8">
            <div
              v-if="moreOptions"
              class="w-24 mt-1 h-auto bg-black relative text-white rounded-lg flex flex-col justify-evenly items-center uppercase"
            >
              <p
                class="hover:bg-white/30 py-2 w-full rounded-t-lg text-center items-center flex justify-center text-xs cursor-pointer"
                @click="
                  ratingForm = true;
                  moreOptions = false;
                "
              >
                Rate
              </p>
              <p
                v-if="user.isFriend && user.isFriend.status === 'accepted'"
                class="hover:bg-white/30 py-2 w-full text-center items-center flex justify-center text-xs cursor-pointer"
                @click="
                  unfriendModal = true;
                  moreOptions = false;
                "
              >
                Unfriend
              </p>
              <p
                class="hover:bg-white/30 py-2 w-full rounded-b-lg text-center items-center flex justify-center text-xs cursor-pointer"
                @click="
                  reportForm = true;
                  moreOptions = false;
                "
              >
                Report
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="this.user.role === 'driver'"
        class="bg-gray-100 rounded-lg w-1/3 flex text-center p-1 gap-2 text-sm"
      >
        <div
          :class="{ 'bg-white': this.currentPage === 'userRoutes' }"
          class="w-full py-1 cursor-pointer rounded-lg"
          @click="this.currentPage = 'userRoutes'"
        >
          Routes
        </div>
        <div
          :class="{ 'bg-white': this.currentPage === 'userRatings' }"
          class="w-full py-1 cursor-pointer rounded-lg"
          @click="this.currentPage = 'userRatings'"
        >
          Reviews
        </div>
      </div>
      <div class="w-full flex grid grid-cols-9">
        <div class="col-span-2"></div>
        <div class="col-span-5 text-center flex">
          <my-routes
            v-if="this.currentPage === 'userRoutes'"
            :user="this.user"
          />
          <my-ratings
            v-if="this.currentPage === 'userRatings'"
            :user="this.user"
          />
        </div>
        <div class="col-span-2">
          <MyFriends
            v-if="user.isFriend && user.isFriend.status === 'accepted'"
            :user="this.user"
          />
        </div>
      </div>
    </div>
    <ReportForm
      v-if="reportForm"
      :user="this.user_id"
      @close-form="handleReportForm()"
      @submit-rating="handleReportForm()"
    />
    <RateForm
      v-if="ratingForm"
      :user="this.user"
      @close-form="handleRatingForm()"
      @submit-rating="handleRatingForm()"
    />
    <UnfriendConfirm
      v-if="unfriendModal"
      @close-modal="handleUnfriendModal()"
      @confirm-action="unfriendUser()"
    >
      Are you sure you want to remove {{ this.fullName }} from your friend list?
    </UnfriendConfirm>
    <MessageModal
      v-if="messageModal"
      :user="this.user"
      @close-message-modal="this.messageModal = false"
    />
  </div>
</template>

<script>
import MyRoutes from "../../layouts/profile/MyRoutes.vue";
import MyRatings from "../../layouts/profile/MyRatings.vue";
import MyFriends from "../../layouts/profile/MyFriends.vue";
import User from "../../services/user.js";
import Friend from "../../services/friend.js";
import BottomArrowIcon from "../../components/icons/BottomArrowIcon.vue";
import ReportForm from "../../layouts/form/ReportForm.vue";
import RateForm from "../../layouts/form/RateForm.vue";
import UnfriendConfirm from "../../layouts/ui/ConfirmBox.vue";
import StarIcon from "../../components/icons/StarIcon.vue";
import BaseLoader from "@/components/general/BaseLoader.vue";
import MessageModal from "@/layouts/ui/MessageModal.vue";

export default {
  name: "PublicProfilesPage",
  components: {
    MessageModal,
    MyRoutes,
    BottomArrowIcon,
    ReportForm,
    RateForm,
    UnfriendConfirm,
    StarIcon,
    MyRatings,
    MyFriends,
    BaseLoader,
  },
  props: {
    user_id: {
      required: true,
    },
  },
  watch: {
    async $route() {
      this.checkUserStatus();
    },
  },
  created() {
    if (sessionStorage.getItem("token")) {
      this.token = sessionStorage.getItem("token");
      this.checkUserStatus();
    } else {
      this.$router.push("/login");
    }
  },
  computed: {
    fullName() {
      return this.user
        ? `${this.user.first_name} ${this.user.last_name}`
        : "Not you";
    },
    imageSource() {
      return this.user && this.user.profile_picture
        ? `${this.storageLink}/${this.user.profile_picture}`
        : require("../../assets/images/default-user-pic.png");
    },
  },
  data() {
    return {
      user: {},
      currentPage: "userRatings",
      storageLink: process.env.VUE_APP_STORAGE_URL,
      token: null,
      moreOptions: false,
      reportForm: false,
      ratingForm: false,
      unfriendModal: false,
      isLoading: false,
      messageModal: false,
    };
  },
  methods: {
    async checkUserStatus() {
      this.isLoading = true;
      this.user = (await this.getUserByID(this.user_id)).data;
      this.isLoading = false;
      console.log(this.user);
      if (this.user_id == this.$store.getters["users/getUser"].id) {
        this.$router.push("/profile");
      }
    },
    async getUserByID(id) {
      try {
        return await User.getUser(id, this.token);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async sendFriendRequest() {
      try {
        await Friend.sendFriendRequest(this.user_id, this.token);
        this.user.isFriend = { status: "pending", sending: true };
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async acceptFriendRequest() {
      try {
        await Friend.acceptFriendRequest(this.user_id, this.token);
        this.user.isFriend = { status: "accepted", sending: true };
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async declineFriendRequest() {
      try {
        await Friend.declineFriendRequest(this.user_id, this.token);
        this.user.isFriend = null;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async cancelFriendRequest() {
      try {
        await Friend.cancelFriendRequest(this.user_id, this.token);
        this.user.isFriend = null;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async unfriendUser() {
      try {
        await Friend.unfriend(this.user_id, this.token);
        this.user.isFriend = null;
        this.unfriendModal = false;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
      }
    },
    async handleCancelAcceptReq() {
      if (this.user.isFriend && this.user.isFriend.status == "pending") {
        if (!this.user.isFriend.sending) {
          this.acceptFriendRequest();
        } else {
          this.cancelFriendRequest();
        }
      }
    },
    handleReportForm() {
      this.reportForm = false;
    },
    handleRatingForm() {
      this.ratingForm = false;
    },
    handleUnfriendModal() {
      this.unfriendModal = false;
    },
    calculateStarType(starNumber) {
      if (this.user.averageRating) {
        if (starNumber < this.user.averageRating) {
          return "star";
        }
        if (
          starNumber - this.user.averageRating > 0.3 &&
          starNumber - this.user.averageRating < 0.7
        ) {
          return "half-star";
        }
        if (this.user.averageRating - starNumber <= 0) {
          return "star";
        }
      }
    },
    calculateStarColor(starNumber) {
      if (this.user.averageRating) {
        if (starNumber <= this.user.averageRating) {
          return "black";
        }
        if (
          starNumber - this.user.averageRating > 0.7 &&
          starNumber - this.user.averageRating < 1
        ) {
          return "none";
        }

        if (
          starNumber - this.user.averageRating > 0.3 &&
          starNumber - this.user.averageRating < 0.7
        ) {
          return "black";
        }
        return "none";
      }
    },
  },
};
</script>
