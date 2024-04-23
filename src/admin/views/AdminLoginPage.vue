<template>
  <div class="flex w-screen h-screen flex-row">
    <div class="lg:w-1/2 w-full h-full flex flex-col">
      <div class="w-full h-full justify-center items-center flex flex-col">
        <div
          class="sm:w-3/5 md:w-2/3 w-5/6 h-auto flex flex-col p-5 gap-5 text-center"
        >
          <h1 class="text-3xl font-semibold mb-3">Login</h1>
          <div class="flex flex-col w-full">
            <input
              id="email"
              v-model="email.value"
              class="py-2 px-3 border-2 focus:outline-black rounded-lg"
              placeholder="Email"
              type="email"
            />
            <custom-error
              v-if="!email.isValid"
              text="Email is required"
            ></custom-error>
          </div>
          <div class="flex flex-col w-full">
            <input
              id="password"
              v-model="password.value"
              class="py-2 px-3 border-2 focus:outline-black rounded-lg"
              placeholder="Password"
              type="password"
            />
            <custom-error
              v-if="!password.isValid"
              text="Password is required"
            ></custom-error>
          </div>
          <custom-button type="button" @click="submit">Login</custom-button>
        </div>
      </div>
      <div class="w-full h-auto py-4 flex justify-evenly text-black/70">
        <p class="text-base">&copy;2024 All Rights</p>
        <p class="text-base">Privacy Policy</p>
      </div>
    </div>
    <img
      class="w-1/2 h-full object-cover lg:flex hidden"
      src="../assets/images/login-background.jpg"
    />
  </div>
</template>

<script>
import CustomButton from "../../components/CustomButton.vue";
import CustomError from "../../components/CustomError.vue";

// import UserService from "../services/user.js";

export default {
  name: "AdminLoginPage",
  components: {
    CustomButton,
    CustomError,
  },
  beforeMount() {
    if (sessionStorage.getItem("isLoggedIn")) {
      this.$store.dispatch("users/logOut");
    }
  },
  data() {
    return {
      email: {
        value: "",
        isValid: true,
      },
      password: {
        value: "",
        isValid: true,
      },
    };
  },
  methods: {
    async submit() {
      this.reset();

      if (!this.checkValidity()) {
        return null;
      }

      const user = {
        email: this.email.value,
        password: this.password.value,
      };

      const response = await this.$store.dispatch("users/login", user);
      if (response) {
        this.$router.push("/admin/home");
      } else {
        console.log("Something went wrong!");
      }
    },
    checkValidity() {
      if (this.email.value === "") {
        this.email.isValid = false;
        if (this.password.value === "") {
          this.password.isValid = false;
        }
        return false;
      }

      if (this.password.value === "") {
        this.password.isValid = false;
        return false;
      }

      return true;
    },
    reset() {
      this.email.isValid = true;
      this.password.isValid = true;
    },
  },
};
</script>
