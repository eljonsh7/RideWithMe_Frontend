import axios from "axios";
import Toast from "@/utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getFilteredRoutes(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/routes/search`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data: object,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async addRoute(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/routes/add`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data: object,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async getRoutes(object) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/routes/get`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      params: object,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async getUserRoutes(userId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/routes/user/${userId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async getRouteByID(routeId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/routes/${routeId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error("Error fetching routes:", error);
      return false;
    }
  },
};
