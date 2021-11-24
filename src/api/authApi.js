import config from "config";
import axios from "axiosConfig";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";


export const authApi = {
  authStatus: async () => {
    try {
      const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.AUTH_STATUS,
        {
          ...HttpUtil.adminHttpHeaders()
        })
      return response.data;
    } catch (error) {
      throw new Error(error.message)
    }
  },
  login: async (data) => {
    try {
      const response = await axios.post(config.API_URL + ENUMS.API_ROUTES.AUTH_LOGIN,
        {
          username: data.username,
          password: data.password
        }, { ...HttpUtil.authHttpHeaders })
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`)
    } catch (error) {
      if (error.response.status === 403) throw new Error("Incorrect username or password!")
      throw new Error(error.message)
    }
  },
  logout: async () => {
    try {
      const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.AUTH_LOGOUT)
      if (response.status === 200) return response.data;
      throw new Error("User is not logged out successfully")
    } catch (error) {
      throw new Error(error.message)
    }
  },
  register: async (data) => {
    try {
      const response = await axios.post(config.API_URL + ENUMS.API_ROUTES.NEW_USER,
        {
          username: data.username,
          email: data.email,
          password: data.password
        }, { ...HttpUtil.authHttpHeaders })
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`)
    } catch (error) {
      if (error.response.status === 403) throw new Error("Incorrect username or password!")
      throw new Error(error.message)
    }
  },
}
