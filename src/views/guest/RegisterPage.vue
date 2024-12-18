<script setup></script>

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
      <div class="w-full justify-center flex items-center mb-8">
        <p class="text-black font-bold">Register to</p>
        <a href="/home">
          <img :src="require('@/assets/images/rwm.png')" alt="rwm" />
        </a>
      </div>

      <form id="signInForm" class="w-full" @submit.prevent="submitForm">
        <div class="flex flex-col gap-5 w-full items-center mb-12">
          <div class="flex gap-5 w-full">
            <input
              id="firstName"
              v-model.trim="firstName.value"
              :class="{ 'border-red-600': !firstName.isValid }"
              class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
              placeholder="First name"
              type="text"
              @blur="clearValidity('firstName')"
            />
            <input
              id="lastName"
              v-model.trim="lastName.value"
              :class="{ 'border-red-600': !lastName.isValid }"
              class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
              placeholder="Last Name"
              type="text"
              @blur="clearValidity('lastName')"
            />
          </div>
          <div class="w-full">
            <div class="w-full relative">
              <select
                id="role"
                v-model="role.value"
                class="mt-1 block w-full rounded-full py-2 px-3 border border-gray-300 outline-none shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option disabled value="">Role</option>
                <option selected="true" value="passenger">Passenger</option>
                <option value="driver">Driver</option>
              </select>
            </div>
          </div>
          <input
            id="email"
            v-model.trim="email.value"
            :class="{ 'border-red-600': !email.isValid }"
            autocomplete="email"
            class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
            inputmode="email"
            placeholder="Email"
            type="email"
            @blur="clearValidity('email')"
          />
          <div class="w-full relative">
            <input
              id="passwordR"
              v-model.trim="passwordR.value"
              :class="{ 'border-red-600': !passwordR.isValid }"
              :type="passVisible ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
              inputmode="passwordR"
              placeholder="Password"
              @blur="clearValidity('passwordR')"
            />
            <span
              class="absolute inset-y-0 right-0 px-2 flex items-center h-full w-5 text-gray-400 focus:outline-none"
              @click="togglePasswordVisibility"
            >
              <i
                :class="['far', passVisible ? 'fa-eye-slash' : 'fa-eye']"
                class="w-5 h-5 relative right-5 cursor-pointer text-black/50"
              ></i>
            </span>
          </div>
          <div class="w-full relative">
            <input
              id="password"
              v-model.trim="password.value"
              :class="{ 'border-red-600': !password.isValid }"
              :type="passRVisible ? 'text' : 'password'"
              autocomplete="current-password"
              class="w-full rounded-full py-2 px-3 border border-gray-300 outline-none"
              inputmode="password"
              placeholder="Confirm password"
              @blur="clearValidity('password')"
            />
            <span
              class="absolute inset-y-0 right-0 px-2 flex items-center h-full w-5 text-gray-400 focus:outline-none"
              @click="togglePasswordRVisibility"
            >
              <i
                :class="['far', passRVisible ? 'fa-eye-slash' : 'fa-eye']"
                class="w-5 h-5 relative right-5 cursor-pointer text-black/50"
              ></i>
            </span>
          </div>
          <button
            class="w-full rounded-full p-2 text-white font-normal bg-gray-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div class="w-full justify-center flex items-center mb-4">
        <p class="text-black mr-1">Already have an account?</p>
        <RouterLink
          class="text-gray-600 hover:underline cursor-pointer"
          to="/login"
        >
          Log In
        </RouterLink>
      </div>
      <RouterLink
        class="text-gray-600 hover:underline cursor-pointer"
        to="/home"
        >Continue Without Account
      </RouterLink>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import Toast from "@/utils/toast";

export default {
  props: [],
  emits: ["auth-in"],
  components: {},
  data() {
    return {
      passVisible: false,
      passRVisible: false,
      email: {
        value: "",
        isValid: true,
      },
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
      passwordR: {
        value: "",
        isValid: true,
      },
      role: {
        value: "",
        isValid: true,
      },
      incorrect: false,
      isLoading: false,
      tDiv: false,
    };
  },
  beforeCreate() {
    this.isLoading = true;
    if (sessionStorage.getItem("token")) this.$router.push("/home");
  },
  methods: {
    togglePasswordVisibility() {
      this.passVisible = !this.passVisible;
    },
    togglePasswordRVisibility() {
      this.passRVisible = !this.passRVisible;
    },
    clearValidity(input) {
      this[input].isValid = true;
      this.incorrect = false;
    },
    validateForm() {
      this.incorrect = false;
      if (this.firstName.value === "") {
        Toast.showWarning("Please fill out all fields.");
        this.firstName.isValid = false;
        return false;
      }
      if (this.lastName.value === "") {
        Toast.showWarning("Please fill out all fields.");
        this.lastName.isValid = false;
        return false;
      }
      if (this.role.value === "") {
        Toast.showWarning("Please fill out all fields.");
        this.role.isValid = false;
        return false;
      }
      if (!this.email.value.includes("@")) {
        Toast.showWarning("Email should be email type.");
        this.email.isValid = false;
        return false;
      }
      if (this.password.value.length < 8) {
        Toast.showWarning("Password should be 8 or more characters long.");
        this.password.isValid = false;
        return false;
      }
      if (this.password.value !== this.passwordR.value) {
        Toast.showWarning("Passwords are not the same.");
        this.password.isValid = false;
        this.passwordR.isValid = false;
        return false;
      }
      return true;
    },
    async submitForm() {
      this.isLoading = true;
      if (!this.validateForm()) {
        this.isLoading = false;
        return;
      }

      const formData = {
        email: this.email.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        role: this.role.value,
      };

      try {
        const response = await this.$store.dispatch("users/register", formData);
        if (response) {
          this.$router.push("/home");
        } else {
          this.incorrect = true;
        }
      } catch (error) {
        this.incorrect = true;
      }
      this.isLoading = false;
    },
  },
};
</script>
