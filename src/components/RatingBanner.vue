<template>
  <div
    class="w-2/3 h-auto bg-none rounded-3xl mx-auto routes-center py-4 border border-black"
  >
    <div class="w-full h-auto mx-auto px-4 flex gap-5 items-center">
      <img
        class="w-14 h-14 rounded-full bg-white cursor-pointer"
        :src="raterImage()"
        @click="this.$router.push('/profile/' + rating.rater.id)"
      />
      <div>
        <p class="text-black bold mb-0 uppercase cursor-pointer"
        @click="this.$router.push('/profile/' + rating.rater.id)">
          {{ rating.rater.first_name + " " + rating.rater.last_name }}
        </p>
        <div class="flex routes-center text-xs">
          <span class="text-yellow-500 mr-1"><div class="flex justify-center w-24"><star-icon class="w-8 my-2" v-for="starIndex in 5" :key="starIndex" 
        :color="calculateStarColor(starIndex)" strokeColor="black" :type="'star'"></star-icon></div></span>
        </div>
      </div>
    </div>

    <div
      class="bg-none rounded-full flex px-20 mt-2"
    >
        <p class="text-black mx-3 text-left">
          {{ rating.description }}
        </p>
    </div>
  </div>
</template>

<script>
import DateUtil from "../utils/date";
import StarIcon from ".//icons/StarIcon.vue";

export default {
  name: "RatingBanner",
  props: ["rating"],
  data() {
    return {
      DateUtil,
      starsColor:"black",
      storageLink: process.env.VUE_APP_STORAGE_URL,
    };
  },
  components:{
    StarIcon
  },
  methods: {
    calculateStarColor(starNumber) {
      return this.rating.stars_number && starNumber <= this.rating.stars_number ? this.starsColor:  "none";
    },
    raterImage(){
      return this.rating.rater.profile_picture ? `${this.storageLink}/${this.rating.rater.profile_picture}`: require("../assets/images/default-user-pic.png");
    }
  },
};
</script>
