import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getLocations(cityId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/get/${cityId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
