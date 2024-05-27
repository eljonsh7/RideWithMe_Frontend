<template>
  <div
    class="w-full h-auto bg-black rounded-3xl flex justify-evenly routes-center py-4 cursor-pointer"
    @click="goToCard"
  >
    <div class="w-auto h-auto flex gap-5 justify-center items-center">
      <img
        alt=""
        class="w-10 h-10 rounded-full bg-white"
        src="../assets/images/default-user-pic.png"
      />
      <div>
        <p class="text-white bold mb-0 uppercase">
          {{ this.route.driver ? this.route.driver.first_name : "" }}
          {{ this.route.driver ? this.route.driver.last_name : "" }}
        </p>
        <div class="flex routes-center text-xs">
          <span class="text-yellow-500 mr-1">★★★★★</span>
        </div>
      </div>
    </div>

    <div
      class="bg-black rounded-full flex justify-center items-center routes-center"
    >
      <div class="w-auto h-auto">
        <p class="text-white font-bold uppercase">
          FROM: {{ this.route.city_from ? this.route.city_from.name : "" }}
        </p>
        <p class="text-white font-bold uppercase">
          TO: {{ this.route.city_to ? this.route.city_to.name : "" }}
        </p>
      </div>
    </div>

    <div class="w-auto h-auto flex justify-center routes-center items-center">
      <p class="text-gray-400">
        {{ DateUtil.getDate(this.route.datetime) }} ->
      </p>
      <p class="text-gray-400">
        {{ DateUtil.getTime(this.route.datetime) }}
      </p>
    </div>
  </div>
</template>

<script>
import DateUtil from "../utils/date";

export default {
  name: "RouteBanner",
  props: ["route"],
  data() {
    return {
      DateUtil,
    };
  },
  methods: {
    goToCard() {
      if (sessionStorage.getItem("token"))
        this.$router.push(`/route/${this.route.id}`);
      else this.$router.push("/login");
    },
  },
};
</script>
