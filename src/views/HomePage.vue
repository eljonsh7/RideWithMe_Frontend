<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 p-5 text-white gap-4 mv-auto mx-auto lg:mx-32">
    <div>
        <label for="fromRoute" class="text-center text-black" style="display: block;">From:</label>
        <input v-model="from.val" type="text" id="fromRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black">
    </div>
    <div class="w-auto flex justify-center items-center rotate-90 lg:rotate-0">
        <img class="lg:w-1/5 w-1/12" src="../assets/images/arrows.png" alt="directions">
    </div>
    <div>
        <label for="toRoute" class="text-center text-black" style="display: block;">To:</label>
        <input v-model="to.val" type="text" id="toRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black">
    </div>
    <div>
        <label for="dateRoute" class="text-center text-black" style="display: block;">Date:</label>
        <input v-model="date.val" type="text" id="dateRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black">
    </div>
    <div class="lg:ml-10">
        <label for="buttonSearch" class="text-center text-black" style="display:block;visibility: hidden;">Search</label>
        <button id="buttonSearch" class="bg-white border border-gray-500 text-black px-3 py-2 rounded-custom w-full lg:w-auto" @click="submitFilter">
            <i class="fas fa-search"></i>
        </button>
      </div>  
</div>
  <hr class="lg:mx-32">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 m-16 gap-10">
    <div v-for="item in Routes" :key="item.id"
      class="w-auto h-auto bg-black rounded-custom flex flex-col justify-center items-center pt-10 pb-8 lg:ml-8 lg:mr-8 sm:ml-2 sm:mr-2 md:mr-10 md:ml-10">
      <div class="bg-black rounded-full flex justify-center items-center mb-5">
        <div class="w-auto h-auto">
          <p class="text-white" style="font-family: mySansation;font-weight: bold;">FROM: PRISHTINA</p>
          <p class="text-white" style="font-family: mySansation;font-weight: bold;">TO: DRENAS</p>
        </div>
      </div>
      <div class="w-auto h-auto flex justify-center items-center mb-5">
        <img src="../assets/images/default-user-pic.png" class="w-10 h-10 rounded-full">
        <div class="ml-2">
          <p class="text-white" style="font-family: mySansation; font-weight: bold; margin-bottom: 0;">ENDRIT GJOKA</p>
          <div class="flex items-center" style="font-size: 0.8rem;">
            <span class="text-yellow-500" style="margin-right: 0.25rem;">★★★★★</span>
          </div>
        </div>
      </div>

      <div class="w-auto h-auto flex justify-center items-center mt-16">
        <p class="text-gray-400" style="font-family: mySansation;">June 25,2024 -></p>
        <p class="text-gray-400" style="font-family: mySansation;">10:00</p>
      </div>
    </div>
  </div>
</template>

<script>
import routeService from "../services/routes.js";
export default {
  data() {
    return{
      from: {
        val: "",
        isValid: true,
      },
      to: {
        val: "",
        isValid: true,
      },
      date: {
        val: "",
        isValid: true,
      }
    }
  },
  methods: {
    async submitFilter() {
    if (!this.from.val) {
        this.from.isValid = false;
        return;
    }
    if (!this.to.val) {
        this.to.isValid = false;
        return;
    }
    const filterData = {
        cityFromId: this.from.val,
        cityToId: this.to.val,
        datetime: this.date.val
    };
    try {
        const response = await routeService.search(filterData);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching routes:", error);
        // Handle errors here
    }
}
  }
}
</script>

<style scoped>
    @font-face {
      font-family: mySansation;
      src: url(../assets/fonts/Sansation_Light.ttf);
    }
    .rounded-custom{
      border-radius: 40px;
    }
</style>