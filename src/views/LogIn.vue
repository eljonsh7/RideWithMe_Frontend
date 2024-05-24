<template>
  <div
    :style="{
      'background-image': 'url(' + require('@/assets/background.svg') + ')',
    }"
    class="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover"
  >
    <div
      class="w-full xl:w-1/3 lg:w-1/2 md:w-2/3 h-full md:h-auto bg-white p-10 items-center flex flex-col justify-center"
    >
      <div class="w-full justify-center flex items-center mb-8 md:mb-12">
        <p class="text-black font-bold">Login to</p>
        <a href="/home">
          <img :src="require('@/assets/images/rwm.png')" alt="rwm" />
        </a>
      </div>

      <form id="signInForm" class="w-full" @submit.prevent="submitForm">
        <div class="flex flex-col gap-5 w-full items-center mb-12">
          <input
            id="email"
            v-model.trim="email.value"
            :class="{ 'border-red-600': !email.isValid }"
            class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
            placeholder="Email"
            type="email"
            @blur="clearValidity('email')"
          />
          <div class="w-full relative">
            <input
              id="password"
              v-model.trim="password.value"
              :class="{ 'border-red-600': !password.isValid }"
              :type="passVisible ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
              inputmode="password"
              placeholder="Password"
              @blur="clearValidity('password')"
            />
            <span
              class="absolute inset-y-0 right-0 px-2 flex items-center h-full w-5 text-gray-400 focus:outline-none"
              @click="togglePasswordVisibility"
            >
              <i
                :class="['far', passVisible ? 'fa-eye-slash' : 'fa-eye']"
                class="w-5 h-5 relative right-5 top-1 cursor-pointer text-black/50"
              ></i>
            </span>
          </div>
          <button
            :class="{
              'bg-gray-600':
                this.email.value.length > 0 && this.password.value.length > 0,
            }"
            :disabled="
              !(this.email.value.length > 0 && this.password.value.length > 0)
            "
            class="w-full rounded-full p-2 text-white font-normal bg-gray-400"
          >
            Login
          </button>
        </div>
      </form>

      <div class="w-full justify-center flex items-center mb-4">
        <p class="text-black mr-1">Don’t have an account?</p>
        <router-link
          class="text-gray-600 hover:underline cursor-pointer"
          to="/register"
        >
          Sign Up
        </router-link>
      </div>
      <router-link
        class="text-gray-600 hover:underline cursor-pointer"
        to="/home"
        >Continue Without Account
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [],
  emits: ["auth-in"],
  components: {},
  data() {
    return {
      passVisible: false,
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      formIsValid: true,
      incorrect: false,
      isLoading: false,
      resetDiv: false,
    };
  },
  beforeCreate() {
    this.isLoading = true;
    if (JSON.parse(sessionStorage.getItem("isLoggedIn")))
      this.$router.push("/home");
  },
  methods: {
    togglePasswordVisibility() {
      this.passVisible = !this.passVisible;
    },
    clearValidity(input) {
      this[input].isValid = true;
      this.incorrect = false;
    },
    validateForm() {
      this.formIsValid = true;
      this.incorrect = false;
      if (!this.email.value.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.value.length === 0) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.validateForm();
      if (!this.formIsValid) {
        this.isLoading = false;
        return;
      }

      const formData = {
        email: this.email.value,
        password: this.password.value,
      };

      try {
        const response = await this.$store.dispatch("users/login", formData);
        if (response) {
          this.$router.push("./home");
        } else {
          this.incorrect = true;
        }
      } catch (error) {
        console.error(error);
        this.incorrect = true;
      }
      this.isLoading = false;
    },
  },
};
</script>
