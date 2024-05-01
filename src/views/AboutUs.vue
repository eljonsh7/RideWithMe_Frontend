<template>
  <div class="w-screen h-screen relative overflow-hidden bg-gray-800">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full xl:w-1/2 md:w-3/4">
        <img src="@/assets/Background1.jpg" alt="Background Image" class="absolute inset-0 object-cover w-full h-full opacity-50">
        <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-10">
          <h1 class="text-5xl font-bold mb-300">About us</h1>
          <div class="w-1/3 text-left mb-8 border-2 border-white rounded-lg p-8 h-1/2">
            <h2 class="text-lg font-semibold text-white mb-2">Our Mission</h2>
            <p class="text-white">At Uber Driver, our mission is to connect passengers with reliable transportation options, making commuting easier, safer, and more efficient for everyone. We aim to create a network where passengers can easily reserve seats in vehicles heading in their desired direction, ensuring a comfortable and timely journey.</p>
            <p class="text-white">At Uber Driver, we are committed to providing a seamless and reliable transportation experience for both passengers and drivers. We continuously strive to enhance our platform to meet the evolving needs of our users and ensure their satisfaction.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
}
</script>

<style scoped>

</style>
