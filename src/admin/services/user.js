import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async deleteUser(userId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/user/delete/${userId}`,
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
  async getUsers(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/get`,
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
  async updateUser(object, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/update/${object.userId}`,
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
  async banUser(userId, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/ban/${userId}`,
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
  async removeUserBan(userId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/users/ban/remove/${userId}`,
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
};
