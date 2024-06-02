<template>
  <div class="w-screen h-screen relative overflow-hidden bg-gray-800">
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-full xl:w-1/2 md:w-3/4">
        <img
          alt="Background Image"
          class="absolute inset-0 object-cover w-full h-full opacity-50"
          src="../../assets/images/aboutUsBackground.jpg"
        />
        <div
          class="absolute inset-0 flex flex-col md:flex-row justify-between items-center text-center text-white p-10"
        >
          <div
            :class="{ 'md:w-1/2': isLoggedIn, 'md:w-full': !isLoggedIn }"
            class="text-left border-2 border-white rounded-lg p-8 h-full overflow-y-scroll w-full"
          >
            <h1 class="text-5xl font-bold mb-8">About us</h1>
            <div class="mb-8">
              <h2 class="text-lg font-semibold text-white mb-2">Our Mission</h2>
              <p class="text-white">
                At Uber Driver, our mission is to connect passengers with
                reliable transportation options, making commuting easier, safer,
                and more efficient for everyone. We aim to create a network
                where passengers can easily reserve seats in vehicles heading in
                their desired direction, ensuring a comfortable and timely
                journey.
              </p>
              <p class="text-white">
                We are committed to providing a seamless and reliable
                transportation experience for both passengers and drivers. We
                continuously strive to enhance our platform to meet the evolving
                needs of our users and ensure their satisfaction.
              </p>
              <p class="text-white">
                Our vision is to revolutionize urban transportation by offering
                a dependable and user-friendly platform that empowers passengers
                and drivers alike. We believe in fostering a community where
                transportation is accessible, affordable, and convenient for
                everyone. By leveraging innovative technology and maintaining a
                focus on customer satisfaction, we aim to become the leading
                choice for urban mobility solutions.
              </p>
              <p class="text-white">
                At Uber Driver, safety is paramount. We implement rigorous
                background checks and continuous monitoring to ensure that our
                drivers meet the highest standards of professionalism and
                reliability. Our platform incorporates real-time tracking,
                secure payment options, and a robust customer support system to
                provide peace of mind for all users.
              </p>
              <p class="text-white">
                We are also dedicated to sustainability. By promoting shared
                rides and efficient route planning, we aim to reduce traffic
                congestion and lower carbon emissions. Our commitment to the
                environment reflects our broader goal of creating a positive
                impact on the communities we serve.
              </p>
              <p class="text-white">
                Join us in our mission to transform the way people move around
                cities. Whether you’re a passenger looking for a reliable ride
                or a driver seeking flexible earning opportunities, Uber Driver
                is here to help you reach your destination. Together, we can
                build a future where urban transportation is efficient, safe,
                and accessible for all.
              </p>
            </div>
          </div>
          <div
            v-if="isLoggedIn"
            class="flex justify-center items-center md:w-1/2 h-full md:px-10"
          >
            <form
              class="h-auto p-4 gap-4 border border-black/50 rounded-xl flex flex-col justify-center bg-white text-black w-full"
              @submit.prevent="submit"
            >
              <div>Add a suggestion/opinion to admins:</div>
              <select
                class="md:w-full w-full py-2 border border-gray-500 rounded-lg bg-white text-black text-center outline-none"
              >
                <option
                  v-for="option in options"
                  :key="option"
                  :value="option"
                  class="capitalize"
                >
                  {{ option }}
                </option>
              </select>
              <textarea
                v-cloak
                v-model="this.content"
                class="overflow-y-auto resize-none border border-black/50 rounded-lg p-2 h-32"
                placeholder="Message"
                style="overflow-wrap: anywhere"
              />
              <div class="flex justify-end">
                <CustomButton :fill="true">Save</CustomButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Suggestion from "../../services/suggestion.js";
import CustomButton from "@/components/form/CustomButton.vue";
import Toast from "@/utils/toast";

export default {
  name: "AboutUs",
  components: { CustomButton },
  data() {
    return {
      type: "enhancement",
      content: "",
      options: ["enhancement", "review", "comment", "bug", "error"],
    };
  },
  computed: {
    isLoggedIn() {
      return sessionStorage.getItem("token");
    },
  },
  methods: {
    async submit() {
      if (this.content === "") {
        Toast.showWarning("Please fill out all fields.");
        return;
      }
      const data = {
        suggestion_type: this.type,
        suggestion_content: this.content,
      };
      this.type = "";
      this.content = "";
      const response = await Suggestion.makeSuggestion(
        data,
        this.$store.getters["users/getToken"]
      );
      if (response) {
        Toast.showSuccess("Suggestion added.");
        this.$router.push("/home");
      }
    },
  },
};
</script>
