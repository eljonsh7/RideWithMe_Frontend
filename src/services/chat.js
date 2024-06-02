import axios from "axios";
import Toast from "../utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getMessages(recipient, type, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/get/${recipient}/${type}`,
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
  async sendMessage(recipientId, data, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/send/${recipientId}`,
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
  async deleteMessages(recipientId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/delete/${recipientId}`,
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
  async getChats(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/get/last`,
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
  async markAsRead(userId, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/read/${userId}`,
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
  async getMembers(groupId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/members/get/${groupId}`,
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
  async sendGroupMessage(groupId, data, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/messages/group/send/${groupId}`,
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
};
