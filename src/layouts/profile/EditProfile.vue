<template>
  <CustomModal @close-modal="this.$emit('close-form')">
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
          <ImageIcon />
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
          <div class="text-sm text-black/50">First name</div>
          <CustomInput v-model="first_name" type="text" />
        </div>
        <div class="w-full text-left">
          <div class="text-sm text-black/50">Last name</div>
          <CustomInput v-model="last_name" type="text" />
        </div>
      </div>
      <div class="flex gap-2">
        <div class="w-full text-left">
          <div class="text-sm text-black/50">Role:</div>
          <CustomSelect
            v-model="role"
            :options="this.roleOptions"
            class="md:w-full"
          />
        </div>
        <div class="w-full text-left">
          <div class="text-sm text-black/50">Car:</div>
          <div
            class="w-full border border-gray-500 p-2 rounded-lg bg-white text-black/50 text-center outline-none cursor-pointer"
            @click="this.$emit('update-car')"
          >
            Change Car Details
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-2">
      <CustomButton @click="reset">Reset</CustomButton>
      <CustomButton :fill="true" @click="updateProfile">Save</CustomButton>
    </div>
  </CustomModal>
</template>

<script>
import CustomModal from "@/layouts/CustomModal.vue";
import CustomButton from "@/components/CustomButton.vue";
import ImageIcon from "@/components/icons/ImageIcon.vue";
import Media from "@/services/media";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomInput from "@/components/CustomInput.vue";

export default {
  name: "EditProfile",
  components: {
    CustomInput,
    CustomSelect,
    ImageIcon,
    CustomButton,
    CustomModal,
  },
  props: ["user"],
  emits: ["close-form", "update-car", "user-updated"],
  data() {
    return {
      storageUrl: process.env.VUE_APP_STORAGE_URL,
      currentImage: null,
      currentImageFile: null,
      first_name: this.user ? this.user.first_name : "",
      last_name: this.user ? this.user.last_name : "",
      role: this.user ? this.user.role : "",
      roleOptions: [
        {
          id: "passenger",
          name: "Passenger",
        },
        {
          id: "driver",
          name: "Driver",
        },
      ],
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
        { media: this.currentImageFile, folder: "users" },
        this.$store.getters["users/getToken"]
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
        token: this.$store.getters["users/getToken"],
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
