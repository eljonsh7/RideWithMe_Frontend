import axios from "axios";
import Toast from "../../utils/toast.js";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addCity(data, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/store`,
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
  async updateCity(data, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/update/${data.id}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
  async deleteCity(cityId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/cities/delete/${cityId}`,
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
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      Toast.showError(error.response.data.message);
      return false;
    }
  },
};
