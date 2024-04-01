<template>
  <div class="w-screen h-screen relative">
    <div class="absolute inset-0 bg-cover bg-center" :style="{ 'background-image': 'url(' + require('@/assets/background.svg') + ')'}"></div>
    <div class="absolute inset-0 flex items-center">
      <div class="w-1/6 absolute left-0 text-black text-4xl cursor-pointer" @click="prevPage">
        <i class="fas fa-arrow-left"></i>
      </div>
      <div class="w-1/6 absolute right-0 text-black text-4xl cursor-pointer" @click="nextPage">
        <i class="fas fa-arrow-right"></i>
      </div>
      <div class="w-full bg-white p-10 flex justify-center items-center">
        <div class="w-full xl:w-1/2 md:w-3/4 flex flex-col justify-center items-center text-center">
          <h1 class="text-black font-bold text-3xl mb-8">About Us</h1>
          <div v-if="currentPage === 1" class="w-full mb-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Our Mission</h2>
            <p class="text-gray-600">At Uber Driver, our mission is to connect passengers with reliable transportation options, making commuting easier, safer, and more efficient for everyone. We aim to create a network where passengers can easily reserve seats in vehicles heading in their desired direction, ensuring a comfortable and timely journey.</p>
          </div>

          <div v-if="currentPage === 2" class="w-full mb-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">What We Offer</h2>
            <ul class="list-disc list-inside text-gray-600">
              <li>Convenience: With our intuitive interface, passengers can quickly find and reserve seats in vehicles that match their travel needs.</li>
              <li>Flexibility: Our service operates on a 24-hour timeline, giving passengers the freedom to plan their journeys according to their schedule.</li>
              <li>Reliability: We prioritize safety and reliability, ensuring that passengers are connected with licensed and vetted drivers who maintain high standards of service.</li>
            </ul>
          </div>

          <div v-if="currentPage === 3" class="w-full mb-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">How It Works</h2>
            <ol class="list-decimal list-inside text-gray-600">
              <li>Registration: Passengers can easily sign up for our platform, providing necessary details to create their accounts.</li>
              <li>Search and Reserve: Once registered, passengers can search for available vehicles heading in their desired direction and reserve seats for their journey.</li>
              <li>Confirmation: Passengers receive confirmation of their reservation along with details of the driver and vehicle.</li>
              <li>Travel: On the day of travel, passengers simply board the reserved vehicle at the designated time and location.</li>
            </ol>
          </div>

          <div v-if="currentPage === 4" class="w-full mb-8">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">Our Commitment</h2>
            <p class="text-gray-600">At Uber Driver, we are committed to providing a seamless and reliable transportation experience for both passengers and drivers. We continuously strive to enhance our platform to meet the evolving needs of our users and ensure their satisfaction.</p>
            <p class="text-gray-600">Join us in revolutionizing the way people commute and experience the convenience of traveling with Uber Driver!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < 4) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
