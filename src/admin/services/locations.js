import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addLocation(object) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/store`,
      headers: {
        Accept: "application/json, text/plain, */*",
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
  async deleteLocation(object) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/delete/${object.locationId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      data: object.data,
    };
    try {
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getCities() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/get`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
    };
    try {
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateLocation(object) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/update/${object.locationId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      data: object.data,
    };
    try {
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
