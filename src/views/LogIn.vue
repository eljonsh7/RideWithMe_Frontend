<script setup>

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover"
       :style="{ 'background-image': 'url(' + require('@/assets/background.svg') + ')'}">
    <div class="w-full xl:w-1/3 lg:w-1/2 md:w-2/3 h-full md:h-auto bg-white p-10 items-center flex flex-col justify-center">
      <div class="w-full justify-center flex items-center mb-8 md:mb-12">
        <p class="text-black font-bold">Login to</p>
        <img :src="require('@/assets/rwm.png')" alt="rwm">
      </div>

      <form @submit.prevent="submitForm" id="signInForm" class="w-full">
        <div class="flex flex-col gap-5 w-full items-center mb-12">
          <input id="email" class="w-full rounded-full p-2 border border-gray-300 outline-none" inputmode="email"
                 autocomplete="email"
                 type="email"
                 :class="{ 'border-red-600': !email.isValid }"
                 v-model.trim="email.val" placeholder="Email"
                 @blur="clearValidity('email')" />
          <div class="w-full relative">
            <input id="password" class="w-full rounded-full p-2 border border-gray-300 outline-none"
                   placeholder="Password" autocomplete="current-password"
                   :class="{ 'border-red-600': !password.isValid }" :type="passVisible ? 'text' : 'password'"
                   v-model.trim="password.val" inputmode="password"
                   @blur="clearValidity('password')" />
            <span @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 px-2 flex items-center h-full w-5 text-gray-400 focus:outline-none">
              <i :class="['far', passVisible ? 'fa-eye-slash' : 'fa-eye']" class="w-5 h-5 relative right-5 cursor-pointer text-black/50"></i>
            </span>
          </div>
          <button class="w-full rounded-full p-2 text-white font-normal bg-gray-400" :class="{'bg-gray-600': this.email.val.length > 0 && this.password.val.length > 0}"
                  :disabled="!(this.email.val.length > 0 && this.password.val.length > 0)">Login</button>
        </div>
      </form>

      <div class="w-full justify-center flex items-center mb-4">
        <p class="text-black mr-1">Don’t have an account?</p>
        <a class="text-gray-400 cursor-pointer"> Sign Up</a>
      </div>
      <a class="text-gray-400 cursor-pointer">Continue Without Account</a>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  props: [],
  emits: ["auth-in"],
  components: {},
  data() {
    return {
      passVisible: false,
      email: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
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
    changeResetDiv(a) {
      this.resetDiv = a;
    },
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
      if (!this.email.val.includes("@")) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.password.val.length === 0) {
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
        email: this.email.val,
        password: this.password.val,
      };

      try {
        const response = await this.$store.dispatch("users/login", formData);
        if (response) {
          this.$emit("auth-in", sessionStorage.getItem("token"));
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          const cookieValue = `token=${
              response.data.token
          };expires=${expirationDate.toUTCString()};path=/`;
          document.cookie = cookieValue;
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
    goToReset() {
      this.$router.push("/reset_password");
    },
  },
};
</script>