import config from "config";
import axios from "axiosConfig";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";

export const dataHandlingApi = {
  download: async (data) => {
    try {
      const response = await axios.get(config.API_URL + ENUMS.DATA_HANDLING.DOWNLOAD, {
        ...HttpUtil.adminHttpHeaders(),
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  upload: async (data) => {
    try {
      const response = await axios.post(config.API_URL + ENUMS.DATA_HANDLING.UPLOAD, {
        ...HttpUtil.adminHttpHeaders(),
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};