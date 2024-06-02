<template>
  <div
    class="flex flex-wrap items-center justify-center md:flex-row flex-col gap-3 px-5 mt-5"
  >
    <div class="w-full md:w-auto">
      <label class="text-center text-black block" for="fromRoute">From:</label>
      <CustomSelect
        id="fromRoute"
        v-model="fromCity"
        :options="this.filteredCities('from')"
      />
    </div>
    <div class="w-auto flex justify-center items-center">
      <ArrowsHorizontalIcon
        class="hidden md:flex text-black mt-6"
        @click="this.reverseFromTo"
      />
      <ArrowsVerticalIcon
        class="md:hidden flex text-black"
        @click="this.reverseFromTo"
      />
    </div>
    <div class="w-full md:w-auto">
      <label class="text-center text-black block" for="toRoute">To:</label>
      <CustomSelect
        id="toRoute"
        v-model="toCity"
        :options="this.filteredCities('to')"
      />
    </div>
    <div class="w-full md:w-auto">
      <label class="text-center text-black block" for="dateRoute">Date:</label>
      <CustomInput id="dateRoute" v-model="date" type="date" />
    </div>
    <div v-if="this.date" class="w-full md:w-auto">
      <label class="text-center text-black block" for="timeRoute">Time:</label>
      <CustomInput id="timeRoute" v-model="time" type="time" />
    </div>
    <div class="mt-6 flex gap-2">
      <div
        v-if="this.time || this.date"
        class="flex justify-center items-center bg-white border border-gray-500 aspect-square h-10 p-2 rounded-full cursor-pointer"
        @click="resetTimeFilter"
      >
        <xMark />
      </div>
      <div
        class="flex justify-center items-center bg-white border border-gray-500 text-black h-10 aspect-square py-2 rounded-full w-full lg:w-auto cursor-pointer"
        @click="
          currentPage = 1;
          getFilteredRoutes();
        "
      >
        <SearchIcon />
      </div>
    </div>
  </div>
</template>

<script>
import ArrowsHorizontalIcon from "../../components/icons/ArrowsHorizontalIcon.vue";
import SearchIcon from "../../components/icons/SearchIcon.vue";
import ArrowsVerticalIcon from "../../components/icons/ArrowsVerticalIcon.vue";
import xMark from "../../components/icons/xMark.vue";
import City from "../../services/city";
import CustomSelect from "@/components/form/CustomSelect.vue";
import CustomInput from "@/components/form/CustomInput.vue";

export default {
  name: "RouteFilters",
  components: {
    CustomInput,
    CustomSelect,
    xMark,
    ArrowsVerticalIcon,
    SearchIcon,
    ArrowsHorizontalIcon,
  },
  emits: ["filter-routes"],
  beforeMount() {
    this.getCities();
  },
  watch: {
    date() {
      this.getFilteredRoutes();
    },
    time() {
      this.getFilteredRoutes();
    },
    fromCity() {
      if (this.toCity) this.getFilteredRoutes();
    },
    toCity() {
      if (this.fromCity) this.getFilteredRoutes();
    },
  },
  data() {
    return {
      cities: [],
      fromCity: null,
      toCity: null,
      date: null,
      time: null,
    };
  },
  methods: {
    async getCities() {
      const response = await City.getCities();
      this.cities = response.cities;
    },
    resetTimeFilter() {
      this.time = null;
      this.date = null;
    },
    filteredCities(a) {
      if (a === "from") {
        return this.cities.filter((item) => {
          return item.id !== this.toCity;
        });
      } else {
        return this.cities.filter((item) => {
          return item.id !== this.fromCity;
        });
      }
    },
    reverseFromTo() {
      const temp = this.fromCity;
      this.fromCity = this.toCity;
      this.toCity = temp;
      this.getFilteredRoutes();
    },
    getFilteredRoutes() {
      const filters = {
        cityFromId: this.fromCity,
        cityToId: this.toCity,
      };

      if (this.date) filters.date = this.date;
      if (this.time) filters.time = this.time;
      this.$emit("filter-routes", filters);
    },
  },
};
</script>
