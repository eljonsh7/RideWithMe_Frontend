import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addCity(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/store`,
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
  async deleteCity(id, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/delete/${id}`,
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
  async getCities(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/get`,
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
  async updateCity(object, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/update/${object.id}`,
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
};
