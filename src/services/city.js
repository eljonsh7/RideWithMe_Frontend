import axios from "axios";

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
      console.error("Error fetching routes:", error);
      return false;
    }
  },
  async getCityByID(id, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/${id}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      return response.token;
    } catch (error) {
      console.error("Error fetching routes:", error);
      return false;
    }
  },
};
