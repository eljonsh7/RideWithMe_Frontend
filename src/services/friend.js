import axios from "axios";
import Toast from "@/utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async sendFriendRequest(friendId, token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/request/${friendId}`,
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
  async acceptFriendRequest(friendId, token) {
    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/accept/${friendId}`,
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
  async rejectFriendRequest(friendId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/decline/${friendId}`,
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
  async cancelFriendRequest(friendId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/cancel/${friendId}`,
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
  async unfriend(friendId, token) {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/unfriend/${friendId}`,
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
  async getUserFriends(userId, token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/friends/get/${userId}`,
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
