import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async login(context, object) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/login`,
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
      sessionStorage.setItem("isAdmin", response.data.user.role == "admin");
      context.commit("setUser", response.data.user);
      context.commit("setToken", response.data.token);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async register(context, object) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/signup`,
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
      sessionStorage.setItem("isAdmin", false);
      context.commit("setUser", response.data.user);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async logOut(context) {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    context.commit("logOut");
  },
  async getUserByToken(context, token) {
    let config = {
      method: "get",
      url: `${apiPath}/users/getByToken`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      context.commit("setUser", response.data);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
