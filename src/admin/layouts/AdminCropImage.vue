<template>
  <custom-modal @close-modal="this.$emit('close-cropper')">
    <div class="w-full">
      <img
        id="selectedImage"
        ref="selectedImage"
        alt="Selected Image"
        class="rounded-full z-10 hover:z-0 relative border-4 border-white object-cover max-w-full"
      />
    </div>
    <div
      class="w-full flex justify-between mt-2"
      style="height: 20%"
      @click.stop
    >
      <custom-button @click="resetCropped">Cancel</custom-button>
      <custom-button :fill="true" @click="showCroppedImage"
        >Save
      </custom-button>
    </div>
  </custom-modal>
</template>

<script>
import Cropper from "cropperjs";
import CustomButton from "../../components/CustomButton.vue";
import CustomModal from "../../layouts/CustomModal.vue";

export default {
  name: "AdminCropImage",
  components: { CustomModal, CustomButton },
  emits: ["close-cropper", "show-cropped-image"],
  props: ["imageFile"],
  data() {
    return {
      cropper: null,
    };
  },
  beforeMount() {
    this.showImage();
  },
  methods: {
    showCroppedImage() {
      this.$emit(
        "show-cropped-image",
        this.cropper.getCroppedCanvas().toDataURL()
      );
    },
    resetCropped() {
      this.cropper.reset();
    },
    showImage() {
      if (this.cropper) {
        this.cropper.destroy();
      }

      const selectedImage = this.$refs.selectedImage;

      if (selectedImage) {
        const reader = new FileReader();
        this.shouldCrop = true;

        reader.onload = (e) => {
          selectedImage.src = e.target.result;
          selectedImage.classList.remove("hidden");
          this.cropper = new Cropper(selectedImage, {
            aspectRatio: 1 / 1,
            zoomable: false,
          });
        };
        reader.readAsDataURL(this.imageFile);
      }
    },
  },
};
</script>
