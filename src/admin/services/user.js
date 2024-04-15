import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async deleteUser(object) {
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
  async getUsers() {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/get`,
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
  async updateUser(object) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/locations/update/${object.userId}`,
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
