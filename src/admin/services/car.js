import axios from "axios";
import Toast from "../../utils/toast.js";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async addCar(object, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/cars/store`,
      headers: {
        Accept: "application/json, text/plain, */*",
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
  async deleteCar(id, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/cars/delete/${id}`,
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
  async getCars(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/cars/get`,
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
  async updateCar(object, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/cars/update/${object.id}`,
      headers: {
        Accept: "application/json, text/plain, */*",
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
