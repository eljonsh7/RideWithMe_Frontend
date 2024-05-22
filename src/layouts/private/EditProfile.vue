<template>
  <custom-modal @close-modal="this.$emit('close-form')">
    <div class="w-full h-44 flex flex-col items-center">
      <img
        :src="imageSource"
        alt=""
        class="h-full rounded-full aspect-square border border-black object-cover"
      />
      <div class="h-0 w-full flex justify-center">
        <label
          class="relative bottom-9 left-14 bg-white text-black fill-black p-1 rounded-full border border-black w-9 h-9 flex items-center justify-center cursor-pointer"
          for="imageInput"
        >
          <image-icon />
        </label>
        <input
          id="imageInput"
          ref="imageInput"
          accept="image/png, image/jpeg"
          hidden
          name="imageInput"
          type="file"
          @change="showSelectedImage"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="w-full text-left">
          <label class="text-sm text-black/50">First name</label>
          <input
            v-model="first_name"
            class="px-3 py-2 rounded-lg outline-none border-2 border-black/50 w-full"
            type="text"
          />
        </div>
        <div class="w-full text-left">
          <label class="text-sm text-black/50">Last name</label>
          <input
            v-model="last_name"
            class="px-3 py-2 rounded-lg outline-none border-2 border-black/50 w-full"
            type="text"
          />
        </div>
      </div>
      <div class="w-full text-left">
        <label class="text-sm text-black/50">Role</label>
        <select
          v-model="role"
          class="px-3 py-2 rounded-lg outline-none border-2 border-black/50 w-full"
        >
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <custom-button @click="reset">Reset</custom-button>
      <custom-button :fill="true" @click="updateProfile">Save</custom-button>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "@/layouts/CustomModal.vue";
import CustomButton from "@/components/CustomButton.vue";
import ImageIcon from "@/components/icons/ImageIcon.vue";
import Media from "@/services/media";

export default {
  name: "EditProfile",
  components: { ImageIcon, CustomButton, CustomModal },
  props: ["user"],
  emits: ["close-form", "user-updated"],
  data() {
    return {
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      currentImage: null,
      currentImageFile: null,
      first_name: this.user ? this.user.first_name : "",
      last_name: this.user ? this.user.last_name : "",
      role: this.user ? this.user.role : "",
    };
  },
  computed: {
    imageSource() {
      if (this.currentImage) return this.currentImage;
      if (this.user && this.user.profile_picture)
        return `${this.storageUrl}/${this.user.profile_picture}`;
      return require("../../assets/images/default-user-pic.png");
    },
  },
  methods: {
    async getMediaLink() {
      const media = await Media.storeMedia(
        { media: this.currentImageFile },
        sessionStorage.getItem("token")
      );

      return media.file_path;
    },
    showSelectedImage() {
      this.currentImageFile = this.$refs.imageInput.files[0];
      this.currentImage = this.currentImageFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.currentImage = e.target.result;
      };
      reader.readAsDataURL(this.currentImageFile);
    },
    async updateProfile() {
      const userObject = {
        user_id: this.user.id,
        token: sessionStorage.getItem("token"),
      };

      if (this.currentImageFile)
        userObject.profile_picture = await this.getMediaLink();
      if (this.user.first_name !== this.first_name)
        userObject.first_name = this.first_name;
      if (this.user.last_name !== this.last_name)
        userObject.last_name = this.last_name;
      if (this.user.role !== this.role) userObject.role = this.role;

      if (
        userObject.first_name ||
        userObject.last_name ||
        userObject.role ||
        userObject.profile_picture
      ) {
        const response = await this.$store.dispatch(
          "users/updateUser",
          userObject
        );
        if (response) this.$emit("user-updated", userObject);
      }

      this.$emit("close-form");
    },
    reset() {
      this.currentImage = null;
      this.currentImageFile = null;
      this.first_name = this.user ? this.user.first_name : "";
      this.last_name = this.user ? this.user.last_name : "";
      this.role = this.user ? this.user.role : "";
    },
  },
};
</script>
