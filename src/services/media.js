import axios from "axios";
import Toast from "../utils/toast.js";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async storeMedia(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/media/store`,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
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
};
