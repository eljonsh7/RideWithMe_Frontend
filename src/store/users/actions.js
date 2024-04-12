import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async login(context, object) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/v1/login`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      data: object,
    };
    try {
      const response = await axios.request(config);
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data.user.id);
      context.commit("setUser", response.data.user);
      context.commit("setToken", response.data.token);
      return response;
    } catch (error) {
      console.log("🚀 ~ file: actions.js:48 ~ login ~ error:", error);
      return false;
    }
  },
  async register(context, object) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/v1/signup`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      data: object,
    };
    try {
      const response = await axios.request(config);
      console.log(response);
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("userId", response.data.user.id);
      context.commit("setUser", response.data.user);
      return response;
    } catch (error) {
      console.log("🚀 ~ file: actions.js:48 ~ login ~ error:", error);
      return false;
    }
  },
  async logOut(context) {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    context.commit("logOut");
  },
};
