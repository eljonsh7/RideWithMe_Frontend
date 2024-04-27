import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
    async search(object) {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${apiPath}/routes/search`,
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer 8|XHNXbVwCXy3T1XYXjtGKiyTjR634nuUEsuA3mgFi1a373b6c`,
          },
          data: object,
        };
        try {
          const response = await axios.request(config);
          return response;
        } catch (error) {
          console.error("Error fetching routes:", error)
          return false;
        }
    },
    async getRoutes(object) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiPath}/routes/get`,
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer 8|XHNXbVwCXy3T1XYXjtGKiyTjR634nuUEsuA3mgFi1a373b6c`,
          },
          params:object,
        };
        try {
          const response = await axios.request(config);
          return response;
        } catch (error) {
          console.error("Error fetching routes:", error)
          return false;
        }
    }
};