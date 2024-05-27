import axios from "axios";
import Toast from "../../utils/toast";

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
      sessionStorage.setItem("token", response.data.token);
      context.commit("setUser", response.data.user);
      context.commit("setToken", response.data.token);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
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
      sessionStorage.setItem("token", response.data.token);
      context.commit("setUser", response.data.user);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async updateUser(context, data) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/update/${data.user_id}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${data.token}`,
      },
      data,
    };
    try {
      const response = await axios.request(config);
      context.commit("setUser", response.data.user);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async logOut(context) {
    sessionStorage.removeItem("token");
    context.commit("logOut");
    Toast.showDefault("You logged out!");
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
      context.commit("setToken", sessionStorage.getItem("token"));
      context.commit("setUser", response.data);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
};
