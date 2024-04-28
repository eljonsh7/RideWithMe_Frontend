import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
    async getCities(object) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiPath}/cities/get`,
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer 8|XHNXbVwCXy3T1XYXjtGKiyTjR634nuUEsuA3mgFi1a373b6c`,
          },
          data: object
        };
        try {
          const response = await axios.request(config);
          return response;
        } catch (error) {
          console.error("Error fetching routes:", error)
          return false;
        }
    },
    async getCityByID(id) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiPath}/cities/${id}`,
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer 8|XHNXbVwCXy3T1XYXjtGKiyTjR634nuUEsuA3mgFi1a373b6c`,
          },
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