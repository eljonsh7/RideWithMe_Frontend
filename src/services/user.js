import axios from "axios";
import Toast from "@/utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getUser(userId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/${userId}`,
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
  async searchUsers(name, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/search/${name}`,
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
