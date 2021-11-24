import config from "config";
import axios from "axiosConfig";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
import FormDataSerializer from "util/FormDataSerializer";

export const projectApi = {
    getProjectById: async (projectId) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.PROJECT_GET + '/' + projectId,
                {
                    ...HttpUtil.adminHttpHeaders(),
                })
            if (response.status === 200) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            throw new Error(error.message)
        }
    },
    postDailyLog: async (projectId, wellId, val) => {
        try {
            const response = await axios.post(config.API_URL + ENUMS.API_ROUTES.DAILY_LOG,
                {
                    project_id: +projectId, // parse to int
                    well_id: +wellId,
                    logs: val
                }, {...HttpUtil.adminHttpHeaders()})
            if (response.status === 201) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            throw new Error(error.message)
        }
    },
    getDailyLog: async (wellId) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.DAILY_LOG + '/' + wellId,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            throw new Error(error.message)
        }
    },
    putDefaultValue: async (wellId, data) => {
        try {
            const response = await axios.put(config.API_URL + ENUMS.API_ROUTES.DEFAULT_VALUE + '/' + wellId,
            {
                ...FormDataSerializer.defultValueFormSubmitSerializer(data)
            }, {...HttpUtil.adminHttpHeaders()})
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    getDefaultValue: async (wellId) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.DEFAULT_VALUE + '/' + wellId,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    getProjectList: async () => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.PROJECT_LIST,
                {
                    ...HttpUtil.adminHttpHeaders()
                })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    postCreateProject: async (projectData) => {
        try {
            const response = await axios.post(config.API_URL + ENUMS.API_ROUTES.PROJECT_CREATE,
                {
                    ...projectData
                }, {...HttpUtil.adminHttpHeaders()})
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    getQcReport: async (id) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.QC_REPORT + '/' + id,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    postCreateTrackingSheet: async (wellId, trackingSheet) => {
        try {
            const response = await axios.post(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_CREATE + '/' + wellId,
            {
                ...trackingSheet
            }, {...HttpUtil.adminHttpHeaders()})
            if (response.status === 201) return;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    getTrackingSheet: async (sheetId) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET + '/' + sheetId,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
    getTrackingSheetList: async (wellId) => {
        try {
            const response = await axios.get(config.API_URL + ENUMS.API_ROUTES.TRACKING_SHEET_LIST + '/' + wellId,
            {
                ...HttpUtil.adminHttpHeaders(),
            })
            if (response.status === 200 && response.data) return response.data;
            throw new Error(`Response status code: ${response.status}`)
        } catch (error) {
            if(error.response.status === 403) throw new Error("Incorrect username or password!")
            throw new Error(error.message)
        }
    },
}