const ROUTES = {
    AUTH: '/auth',
    ADMIN: '/admin',
    DASHBOARD: '/dashboard',
    PROJECT: '/project',
    LOGIN: '/login',
    REGISTER: '/register',
    PROJECT_EXISTING: '/project-select',
    PROJECT_NEW: '/project-new',
    DATA_INPUT: '/data-input',
    DAILY_LOG: '/daily-log',
    DEFAULT_VALUES: '/default-values',
    TRACKING_SHEET: '/tracking-sheet',
    OC_REPORT: '/qc-report',
    NOTFOUND: '/404',
    ACCOUNT: '/account'
}

const API_ROUTES = {
    AUTH_STATUS: '/api/auth',
    AUTH_LOGIN: '/api/auth',
    AUTH_LOGOUT: '/api/auth/auth-logout',
    PROJECT_CREATE: '/api/project',
    PROJECT_GET: '/api/project',
    PROJECT_LIST: '/api/project/list',
    DATA_INPUT_FILE_UPLOAD: '/api/data-input/file',
    DATA_VIEW_DATA: '/api/data-input/view',
    DAILY_LOG: '/api/daily-log',
    DAILY_LOG_GET: '/api/daily-log/get',
    DEFAULT_VALUE: '/api/default-value',
    DEFAULT_VALUE_GET: '/api/default-value/get',
    DEFAULT_VALUE_UPDATE: '/api/default-value/update',
    TRACKING_SHEET: '/api/tracking-sheet',
    TRACKING_SHEET_LIST: '/api/tracking-sheet/stage_list',
    TRACKING_SHEET_GET: '/api/tracking-sheet/get',
    TRACKING_SHEET_STAGE_CREATE: '/api/tracking-sheet/stage/create',
    TRACKING_SHEET_CREATE: '/api/tracking-sheet/create',
    TRACKING_SHEET_UPDATE: '/api/tracking-sheet',
    QC_REPORT: '/api/qc-report',
    NEW_USER: '/api/user'
}

const AWS = {
    API_NAME: 'cutoverplan-api'
}

const FORM_FIELDS = {
    PROJECT: {
        PROJECT_NAME: 'project_name',
        PROJECT_UUID: 'project_uuid',
    },
    JOB_INFO: {
        JOB_NAME: 'job_name',
        JOB_TYPE: 'job_type',
        JOB_ID: 'job_id',
        AFE_ID: 'afe_id',
        COUNTY_NAME: 'county_name',
        BASIN_NAME: 'basin_name',
        STATE: 'state',
        JOB_START_DATE: 'job_start_date',
        JOB_END_DATE: 'job_end_date',
    },
    PAD_INFO: {
        PAD_NAME: 'pad_name',
        // PAD_ID: 'pad_uuid',
        CLIENT_NAME: 'client_name',
        CUSTOMER_FIELD_REP: 'customer_field_rep',
        REP_CONTACT_NUMBER: 'rep_contact_number',
        OPERATOR: 'operator_name',
        SERVICE_COMPANY: 'service_company_name',
        WIRELINE_COMPANY: 'wireline_company',
    },
    WELL_INFO: {
        WELL_NAME: "well_name",
        NO_OF_STAGES: "num_stages",
        WELL_API: "well_api",
        FORMATION: "formation",
        LAT: "surface_latitude",
        LONG: "surface_longitude",
    },
    WELL_VOLUME: {
        TYPE: "type",
        OD: "od",
        WT: "wt",
        ID: "id",
        DEPTH_MD: "depth_md",
        TOL: "tol",
    },
    WELL_VOLUME_ESTIMATIONS: {
        SURFACE_VOL: 'surface_vol',
        BBLS: 'bbls',
        GALLONS: 'gallons',
    },
    CLIENT_INFO: {
        CLIENT_USERNAME: 'clientusername',
        TITLE: 'title',
        PASSWORD: 'password',
        ACTION: 'action'
    },
    CREW_INFO: {
        ROLE: 'role',
        NAME: 'name',
        SHIFT: 'shift',
        ACTION: 'action'
    },
    EQUIPMENT: {
        TRAILERS_ID: 'trailers_id',
        POWERPACK_ID: 'powerpack_id',
        SOURCE_ID: 'source_id',
        ACCUMULATOR_ID: 'accumulator_id',
        HYDROPHONES_ID: 'hydrophones_id',
        PSI_TRANSDUCER_ID: 'transducer_id',
        HOTSPOT_ID: 'hotspot_id',
    }
}

const ENUMS = {
    ROUTES,
    API_ROUTES,
    AWS,
    FORM_FIELDS
}

export default ENUMS;