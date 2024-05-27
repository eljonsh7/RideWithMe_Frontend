import axios from "axios";
import Toast from "../utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getCities() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/get`,
      headers: {
        Accept: "application/json, text/plain, */*",
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
  async getCityByID(cityId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/${cityId}`,
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
