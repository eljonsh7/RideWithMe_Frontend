import axios from "axios";

const apiPath = process.env.VUE_APP_SERVICE_URL;

export default {
    async search(object) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${apiPath}/routes/search`, // Assuming this is the endpoint for fetching routes
          headers: {
            Accept: "application/json, text/plain, */*",
            Authorization: `Bearer 8|XHNXbVwCXy3T1XYXjtGKiyTjR634nuUEsuA3mgFi1a373b6c`,
          },
          data: object
        };
        try {
          const response = await axios.request(config);
          console.log(response);
          // Handle the response as needed, such as updating state or UI
          return response;
        } catch (error) {
          console.error("Error fetching routes:", error);
          // Handle errors here
          return false;
        }
      }
};