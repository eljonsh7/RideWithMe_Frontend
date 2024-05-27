<template>
  <div class="w-full flex flex-col gap-3">
    <div>{{ user.id == this.$store.getters["users/getUser"].id ? "My" : user.first_name +"'s" }} Reviews</div>
    <div class="flex gap-2 my-2 w-full justify-center">
      <button
        v-for="star in 5"
        :key="star"
        :class="calculateClasses(star)"
        @click="filterRatings(star)"
      >
        {{ star + (star == 1 ? " star" :" stars")}}
      </button>
      <button
        :class="calculateClasses(null)"
        @click="resetFilter"
      >
        All
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <rating-banner
        v-for="(rating, index) in filteredRatings"
        :key="index"
        :index="index"
        :rating="rating"
      />
      <p v-if="filteredRatings.length==0" class="font-bold text-lg">User has no reviews at the moment.</p>
    </div>
  </div>
</template>

<script>
import RatingBanner from "../../components/RatingBanner.vue";

import Rating from "../../services/rating.js";

export default {
  name: "MyRatings",
  components: { RatingBanner },
  props: ["user"],
  created() {
    this.getMyRatings();
  },
  data() {
    return {
      ratings: [],
      filteredRatings: [],
      selectedStarRating: null,
      loggedUser: this.$store.getters['users/getUser'],
    };
  },
  methods: {
    async getMyRatings() {
      const response = await Rating.getRatings(
      this.$route.params.user_id ? this.$route.params.user_id : this.loggedUser.id ,
      this.$store.getters['users/getToken']
      );
      this.ratings = response.ratings;
      this.filteredRatings = this.ratings;
    },
    filterRatings(starRating) {
      this.selectedStarRating = starRating;
      this.filteredRatings = this.ratings.filter(
        (rating) => rating.stars_number === starRating
      );
    },
    resetFilter() {
      this.selectedStarRating = null;
      this.filteredRatings = this.ratings;
    },
    calculateClasses(stars){
      return this.selectedStarRating == stars ? "bg-black px-3 py-1 rounded-lg text-white" : "bg-none px-3 py-1 rounded-lg text-black border border-black";
    }
  },
};
</script>
