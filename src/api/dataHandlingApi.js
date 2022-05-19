import config from "config";
import axios from "axiosConfig";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";

export const dataHandlingApi = {
  downloadProject: (project_id) => {
    return axios.get(config.API_URL + ENUMS.API_ROUTES.DOWNLOAD_PROJECT + "/" + project_id, {
      ...HttpUtil.adminHttpHeaders(),
      responseType: "blob",
    });
  },
  uploadProject: async (data) => {
    return axios.post(config.API_URL + ENUMS.API_ROUTES.UPLOAD_PROJECT, data, {
      ...HttpUtil.adminHttpHeaders(),
    });
  },
};
