import axios from "axios";
import Toast from "@/utils/toast";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
  async getReportReasons(token) {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiPath}/report/reasons/get`,
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
  async addReport(report,user,token) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiPath}/reports/add/${user}`,
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      data:report,
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
