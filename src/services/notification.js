import axios from "axios";
import Toast from "../utils/toast.js";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getNotifications(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/notifications/get`,
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
