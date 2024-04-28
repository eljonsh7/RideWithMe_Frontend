import axios from "axios";

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
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
