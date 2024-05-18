import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async reserveRoute(reservation, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/reservations/create`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data:reservation
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