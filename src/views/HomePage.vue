<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 p-5 text-white gap-4 mv-auto mx-auto lg:mx-32">
    <div>
        <label for="fromRoute" class="text-center text-black" style="display: block;">From:</label>
        <select v-model="from.val" id="fromRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black text-center">
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
    </div>
    <div class="w-auto flex justify-center items-center rotate-90 lg:rotate-0">
        <img class="lg:w-1/5 w-1/12" src="../assets/images/arrows.png" alt="directions">
    </div>
    <div>
        <label for="toRoute" class="text-center text-black" style="display: block;">To:</label>
        <select v-model="to.val" id="toRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black text-center">
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
    </div>
    <div>
      <label for="dateRoute" class="text-center text-black" style="display: block;">Date:</label>
      <input v-model="date.val" type="date" id="dateRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black text-center">
    </div>
    <div>  
      <label for="timeRoute" class="text-center text-black" style="display: block;">Time:</label>
      <div class="flex justify-center">
        <input v-if="isTimeRange === false" v-model="time.val" type="time" id="timeRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black text-center">
        <select v-if="isTimeRange === true" v-model="rangeTime.val" id="timeRoute" class="w-full border border-gray-500 p-2 rounded-3xl bg-white text-black text-center">
            <option v-for="hour in 24" :key="hour" :value="hour">
                {{ (hour % 12 || 12) + (hour < 12 || hour === 24 ? ' AM' : ' PM') }}
            </option>
        </select>
        <button id="timeType" class="bg-white border border-gray-500 text-black w-11 h-10 px-3 py-2 rounded-custom ml-2 lg:w-auto" @click="isTimeRange = !isTimeRange">
            <i v-if="isTimeRange === false" class="fas fa-sliders-h"></i>
            <i v-if="isTimeRange === true" class="far fa-clock"></i>
        </button>
        <button v-if="time.val || rangeTime.val" id="resetTime" class="bg-white border border-gray-500 text-black w-11 h-10 px-3 py-2 rounded-custom ml-2 lg:w-auto" @click="resetTimeFilter">
            <x-mark></x-mark>
        </button>
      </div>
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
          <p class="text-white" style="font-family: mySansation;font-weight: bold;">FROM: {{item.city_from.name.toUpperCase()}}</p>
          <p class="text-white" style="font-family: mySansation;font-weight: bold;">TO: {{item.city_to.name.toUpperCase()}}</p>
        </div>
      </div>
      <div class="w-auto h-auto flex justify-center items-center mb-5">
        <img src="../assets/images/default-user-pic.png" class="w-10 h-10 rounded-full">
        <div class="ml-2">
          <p class="text-white" style="font-family: mySansation; font-weight: bold; margin-bottom: 0;">{{item.driver.first_name.toUpperCase()}} {{item.driver.last_name.toUpperCase()}}</p>
          <div class="flex items-center" style="font-size: 0.8rem;">
            <span class="text-yellow-500" style="margin-right: 0.25rem;">★★★★★</span>
          </div>
        </div>
      </div>

      <div class="w-auto h-auto flex justify-center items-center mt-16">
        <p class="text-gray-400" style="font-family: mySansation;">{{ getDate(item.datetime) }} -></p>
        <p class="text-gray-400" style="font-family: mySansation;">{{ getTime(item.datetime) }}</p>
      </div>
    </div>
  </div>
  <div v-if="Routes.length > 0" class="w-full flex justify-center my-8 items-center">
    <button @click="goToPage(currentPage - 1)" v-if="currentPage != 1" class="w-8 h-8 bg-black text-white rounded-full focus:outline-none mr-4">
        <i class="fas fa-chevron-left"></i>
    </button>
    <button v-if="currentPage > 3" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none mr-2" @click="goToPage(1)">1</button>
    <template v-if="currentPage > 4">
        <span class="text-gray-800 mr-2">...</span>
    </template>
    <button v-if="currentPage>2" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none mr-2" @click="goToPage(currentPage-2)">{{ currentPage-2 }}</button>
    <button v-if="currentPage>1" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none mr-2" @click="goToPage(currentPage-1)">{{ currentPage-1 }}</button>
    <button :disabled="true" class="w-8 h-8 bg-black text-white rounded-full mr-2">{{ currentPage }}</button>
    <button v-if="lastPage-currentPage>0" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none mr-2" @click="goToPage(currentPage + 1)">{{ currentPage + 1 }}</button>
    <button v-if="lastPage-currentPage>1" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none mr-2" @click="goToPage(currentPage + 2)">{{ currentPage + 2 }}</button>
    <template v-if="currentPage + 3 < lastPage">
        <span class="text-gray-800 mr-2">...</span>
    </template>
    <button v-if="currentPage + 2 < lastPage" class="w-8 h-8 rounded-full text-gray-800 hover:text-white hover:bg-black focus:outline-none" @click="goToPage(lastPage)">{{ lastPage }}</button>
    <button @click="goToPage(currentPage + 1)" v-if="currentPage != lastPage" class="w-8 h-8 bg-black text-white rounded-full focus:outline-none ml-4">
        <i class="fas fa-chevron-right"></i>
    </button>
</div>
<br>


</template>


<script>
import routeService from "../services/routes.js";
import citiesService from "../services/cities.js";
import xMark from "../components/icons/xMark.vue";
export default {
  components:{
    xMark,
  },
  data() {
    return{
      cities:[],
      Routes: [],
      from: {
        val: "",
        isValid: true,
      },
      to: {
        val: "",
        isValid: true,
      },
      date: {
        val: new Date().toISOString().substr(0, 10),
        isValid: true,
      },
      rangeTime:{
        val:"",
        isValid: true,
      },
      time:{
        val:"",
        isValid: true,
      },
      dateTime:{
        val:"",
        isValid: true,
      },
      currentPage: 1,
      pageSize: 12,
      lastPage: "",
      isTimeRange: false,
    }
  },
  async mounted() {
    try {
      const response = await citiesService.getCities();
      this.cities = response.data.cities;
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  },
  methods: {
    async goToPage(pageNumber) {
      this.currentPage = pageNumber;
      await this.submitFilter();
    },
    resetTimeFilter(){
      this.time.val='';
      this.date.val=new Date().toISOString().substr(0, 10);
      this.rangeTime.val='';
      this.isTimeRange=false;
    },
    async submitFilter() {
    if (!this.from.val) {
        this.from.isValid = false;
        return;
    }
    if (!this.to.val) {
        this.to.isValid = false;
        return;
    }
    let filterData = {
        cityFromId: this.from.val,
        cityToId: this.to.val,
        page: this.currentPage,
        pageSize: this.pageSize
    };
      if (this.isTimeRange) {
        this.time.val = this.rangeTime.val;
          if (this.time.val < 10) {
            this.time.val = '0' + this.time.val;
          }
          this.time.val += ':00';
        }
    if(this.date.val && this.time.val){
      this.dateTime.val = this.date.val + " " +  this.time.val;
      filterData = {
        cityFromId: this.from.val,
        cityToId: this.to.val,
        datetime: this.dateTime.val,
        page: this.currentPage,
        pageSize: this.pageSize,
        timeRange : this.isTimeRange
      }
    }
    try {
        const response = await routeService.search(filterData);
        this.Routes = response.data.data;
        this.lastPage = response.data.last_page;
    } catch (error) {
        console.error("Error fetching routes:", error);
    }
},
getDate(datetime) {
    const dateObj = new Date(datetime);
    return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
  },
  getTime(datetime) {
    const dateObj = new Date(datetime);
    return `${('0' + dateObj.getHours()).slice(-2)}:${('0' + dateObj.getMinutes()).slice(-2)}`;
  }
}}
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