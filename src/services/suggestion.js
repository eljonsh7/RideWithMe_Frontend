import axios from "axios";
import Toast from "../utils/toast.js";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async makeSuggestion(data, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/suggestions/add`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data,
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
