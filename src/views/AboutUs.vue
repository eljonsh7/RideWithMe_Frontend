<template>
  <div class="w-screen h-screen relative overflow-hidden bg-gray-800">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full xl:w-1/2 md:w-3/4">
        <img src="@/assets/Background1.jpg" alt="Background Image" class="absolute inset-0 object-cover w-full h-full opacity-50">
        <div class="absolute inset-0 flex flex-row justify-between items-center text-center text-white p-10">
          <div class="w-1/2 text-left border-2 border-white rounded-lg p-8 h-full">
            <h1 class="text-5xl font-bold mb-8">About us</h1>
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-white mb-2">Our Mission</h2>
              <p class="text-white">At Uber Driver, our mission is to connect passengers with reliable transportation options, making commuting easier, safer, and more efficient for everyone. We aim to create a network where passengers can easily reserve seats in vehicles heading in their desired direction, ensuring a comfortable and timely journey.</p>
              <p class="text-white">We are committed to providing a seamless and reliable transportation experience for both passengers and drivers. We continuously strive to enhance our platform to meet the evolving needs of our users and ensure their satisfaction.</p>
              <p class="text-white">Our vision is to revolutionize urban transportation by offering a dependable and user-friendly platform that empowers passengers and drivers alike. We believe in fostering a community where transportation is accessible, affordable, and convenient for everyone. By leveraging innovative technology and maintaining a focus on customer satisfaction, we aim to become the leading choice for urban mobility solutions.</p>
              <p class="text-white">At Uber Driver, safety is paramount. We implement rigorous background checks and continuous monitoring to ensure that our drivers meet the highest standards of professionalism and reliability. Our platform incorporates real-time tracking, secure payment options, and a robust customer support system to provide peace of mind for all users.</p>
              <p class="text-white">We are also dedicated to sustainability. By promoting shared rides and efficient route planning, we aim to reduce traffic congestion and lower carbon emissions. Our commitment to the environment reflects our broader goal of creating a positive impact on the communities we serve.</p>
              <p class="text-white">Join us in our mission to transform the way people move around cities. Whether you’re a passenger looking for a reliable ride or a driver seeking flexible earning opportunities, Uber Driver is here to help you reach your destination. Together, we can build a future where urban transportation is efficient, safe, and accessible for all.</p>
            </div>
          </div>
          <div class="w-1/3 text-left border-2 border-white rounded-lg p-8 bg-gray-800 bg-opacity-50 text-white">
            <h2 class="text-lg font-semibold mb-4">Contact Us</h2>
            <form>
              <div class="mb-4">
                <label for="name" class="block text-white">Name:</label>
                <input type="text" id="name" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Name">
              </div>
              <div class="mb-4">
                <label for="email" class="block text-white">Email:</label>
                <input type="email" id="email" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Email">
              </div>
              <div class="mb-4">
                <label for="message" class="block text-white">Message:</label>
                <textarea id="message" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="Your Message" rows="4"></textarea>
              </div>
              <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-lg">Submit</button>
            </form>
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
