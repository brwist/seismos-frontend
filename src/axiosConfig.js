import Axios from "axios";

const instance = Axios.create({
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  withCredentials: true,
  responseType: "json",
  maxRedirects: 10,
});

export default instance;
