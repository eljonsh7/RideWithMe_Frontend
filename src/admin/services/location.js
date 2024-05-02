import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addLocation(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/store`,
      headers: {
        Accept: "application/json, text/plain, */*",
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
  async deleteLocation(locationId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/delete/${locationId}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
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
      return await axios.request(config);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateLocation(object, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/update/${object.locationid}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
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
