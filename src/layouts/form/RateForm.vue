<template>
  <custom-modal class="text-left" @close-modal="this.$emit('close-form')">
    <div>
      <div>Rate</div>
      <div class="flex justify-center">
        <star-icon
          v-for="starIndex in 5"
          :key="starIndex"
          :color="calculateStarColor(starIndex)"
          class="w-10 mx-2 my-2 cursor-pointer"
          strokeColor="black"
          type="star"
          @click="updateStars(starIndex)"
          @mouseenter="tempStars = starIndex"
          @mouseleave="tempStars = 0"
        ></star-icon>
      </div>
    </div>
    <div>
      <div>Review</div>
      <textarea
        id="description"
        v-model="description"
        class="w-full h-40 border border-gray-500 p-2 rounded-lg bg-white text-black"
        cols="50"
        rows="4"
        style="resize: none"
      ></textarea>
    </div>
    <div class="flex justify-between">
      <custom-button @click="this.$emit('close-form')">Cancel</custom-button>
      <custom-button :fill="true" @click="submitRating()">Submit</custom-button>
    </div>
  </custom-modal>
</template>

<script>
import CustomModal from "../ui/CustomModal.vue";
import CustomButton from "../../components/form/CustomButton.vue";
import Rating from "../../services/rating.js";
import StarIcon from "../../components/icons/StarIcon.vue";

export default {
  name: "RouteForm",
  components: { CustomButton, CustomModal, StarIcon },
  props: ["user"],
  emits: ["close-form"],
  data() {
    return {
      reasons: {},
      description: "",
      stars: 0,
      tempStars: 0,
      starColor: "none",
      starFillColor: "black",
    };
  },
  beforeMount() {
    if (this.user.alreadyRating) {
      this.stars = this.user.alreadyRating.stars_number;
      this.description = this.user.alreadyRating.description;
    }
  },
  methods: {
    updateStars(ratingStars) {
      this.stars = ratingStars == this.stars ? 0 : ratingStars;
    },
    calculateStarColor(starNumber) {
      return this.tempStars == 0
        ? this.stars >= starNumber
          ? this.starFillColor
          : this.starColor
        : this.tempStars >= starNumber
        ? this.starFillColor
        : this.starColor;
    },
    async submitRating() {
      if (this.stars == 0) {
        return;
      }
      const form = {
        stars_number: this.stars,
        description: this.description,
      };
      if (this.user.alreadyRating) {
        if (
          !(
            this.stars == this.user.alreadyRating.stars_number &&
            this.description == this.user.alreadyRating.description
          )
        ) {
          await Rating.updateRating(
            form,
            this.user.id,
            sessionStorage.getItem("token")
          );
        }
      } else {
        await Rating.addRating(
          form,
          this.user.id,
          sessionStorage.getItem("token")
        );
      }
      window.location.reload();
    },
  },
};
</script>
