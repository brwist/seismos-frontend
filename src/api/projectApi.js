import config from "config";
import axios from "axiosConfig";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
import FormDataSerializer from "util/FormDataSerializer";

export const projectApi = {
  getProjectById: async (projectId) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.PROJECT_GET + "/" + projectId,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      if (response.status === 200) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  postDailyLog: async (wellId, val) => {
    try {
      const response = await axios.post(
        config.API_URL + ENUMS.API_ROUTES.DAILY_LOG + "/" + wellId,
        {
          logs: val,
        },
        { ...HttpUtil.adminHttpHeaders() }
      );
      console.log(`POST response of [postDailyLog] method:`, response);
      if (response.status === 201) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getDailyLog: async (wellId) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.DAILY_LOG + "/" + wellId,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  putDefaultValue: async (wellId, data) => {
    const x = { ...FormDataSerializer.defultValueFormSubmitSerializer(data) };
    try {
      const response = await axios.put(
        config.API_URL + ENUMS.API_ROUTES.DEFAULT_VALUE + "/" + wellId,
        {
          ...FormDataSerializer.defultValueFormSubmitSerializer(data),
        },
        { ...HttpUtil.adminHttpHeaders() }
      );
      console.log("putDefaultValue: ", response);
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      console.log("putDefaultValue: ", error.response.data);
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  getDefaultValue: async (wellId) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.DEFAULT_VALUE + "/" + wellId,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      console.log("GET response [getDefaultValue]: ", response);
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      console.log(
        "GET error response [postCreateTrackingSheet]: ",
        error.response
      );
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  getProjectList: async () => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.PROJECT_LIST,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  postCreateProject: async (projectData) => {
    try {
      const response = await axios.post(
        config.API_URL + ENUMS.API_ROUTES.PROJECT_CREATE,
        {
          ...projectData,
        },
        { ...HttpUtil.adminHttpHeaders() }
      );
      if (response.status === 200 && response.data) {
        console.log(`postCreateProject response`, response);
        return response.data;
      }
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  getQcReport: async (id) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.QC_REPORT + "/" + id,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  postCreateTrackingSheet: async (wellId, trackingSheet) => {
    try {
      const response = await axios.post(
        config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_CREATE + "/" + wellId,
        {
          ...trackingSheet,
        },
        { ...HttpUtil.adminHttpHeaders() }
      );
      console.log("POST response [postCreateTrackingSheet]: ", response);
      if (response.status === 201) return;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      console.log(
        "ERROR POST response [postCreateTrackingSheet]: ",
        error.response
      );
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  putUpdateTrackingSheet: async (stage_id, trackingSheet) => {
    console.log("SENT DATA:", trackingSheet);
    try {
      const response = await axios.put(
        config.API_URL +
          ENUMS.API_ROUTES.TRACKING_SHEET_UPDATE +
          "/" +
          stage_id,
        {
          ...trackingSheet,
        },
        { ...HttpUtil.adminHttpHeaders() }
      );
      if (response.status === 200) return;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      console.log(`putUpdateTrackingSheet error`, error.response);
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  getTrackingSheet: async (sheetId) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET + "/" + sheetId,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
  getTrackingSheetList: async (wellId) => {
    try {
      const response = await axios.get(
        config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_LIST + "/" + wellId,
        {
          ...HttpUtil.adminHttpHeaders(),
        }
      );
      console.log(`GET response of [getTrackingSheetList] method:`, response);
      if (response.status === 200 && response.data) return response.data;
      throw new Error(`Response status code: ${response.status}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403)
        throw new Error("Incorrect username or password!");
      throw new Error(error.message);
    }
  },
};
