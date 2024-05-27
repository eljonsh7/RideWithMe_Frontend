import axios from "axios";
import Toast from "@/utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addRating(rating,user,token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/ratings/add/${user}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data:rating,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async updateRating(rating,user,token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/ratings/update/${user}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data:rating,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async getRatings(user,token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/ratings/get/${user}`,
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
};
