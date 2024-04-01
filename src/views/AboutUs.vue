<template>
    <div class="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover"
         :style="{ 'background-image': 'url(' + require('@/assets/background.svg') + ')'}">
      <div class="w-full xl:w-1/3 lg:w-1/2 md:w-2/3 h-full md:h-auto bg-white p-10 items-center flex flex-col justify-center">
        <div class="w-full justify-center flex items-center mb-8 md:mb-12">
          <h1 class="text-black font-bold text-3xl">About Us</h1>
        </div>
  
        <div class="w-full mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Our Mission</h2>
          <p class="text-gray-600">At Uber Driver, our mission is to connect passengers with reliable transportation options, making commuting easier, safer, and more efficient for everyone. We aim to create a network where passengers can easily reserve seats in vehicles heading in their desired direction, ensuring a comfortable and timely journey.</p>
        </div>
  
        <div class="w-full mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">What We Offer</h2>
          <ul class="list-disc list-inside text-gray-600">
            <li>Convenience: With our intuitive interface, passengers can quickly find and reserve seats in vehicles that match their travel needs.</li>
            <li>Flexibility: Our service operates on a 24-hour timeline, giving passengers the freedom to plan their journeys according to their schedule.</li>
            <li>Reliability: We prioritize safety and reliability, ensuring that passengers are connected with licensed and vetted drivers who maintain high standards of service.</li>
          </ul>
        </div>
  
        <div class="w-full mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">How It Works</h2>
          <ol class="list-decimal list-inside text-gray-600">
            <li>Registration: Passengers can easily sign up for our platform, providing necessary details to create their accounts.</li>
            <li>Search and Reserve: Once registered, passengers can search for available vehicles heading in their desired direction and reserve seats for their journey.</li>
            <li>Confirmation: Passengers receive confirmation of their reservation along with details of the driver and vehicle.</li>
            <li>Travel: On the day of travel, passengers simply board the reserved vehicle at the designated time and location.</li>
          </ol>
        </div>
  
        <div class="w-full mb-8">
          <h2 class="text-lg font-semibold text-gray-700 mb-2">Our Commitment</h2>
          <p class="text-gray-600">At Uber Driver, we are committed to providing a seamless and reliable transportation experience for both passengers and drivers. We continuously strive to enhance our platform to meet the evolving needs of our users and ensure their satisfaction.</p>
          <p class="text-gray-600">Join us in revolutionizing the way people commute and experience the convenience of traveling with Uber Driver!</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutUs'
  }
  </script>
  
  <style scoped>
  /* Add your scoped styles here */
  </style>