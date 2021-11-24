import ENUMS from "constants/appEnums";

const projectTable = [
    {
        title: 'Job #',
        dataIndex: 'job_number',
        render: (text) => text,
    },
    {
        title: 'Job name',
        dataIndex: 'job_name',
    },
    {
        title: 'Project name',
        dataIndex: 'project_name',
    },
    {
        title: 'Created by',
        dataIndex: 'created_by',
    },
    {
        title: 'Created date',
        dataIndex: 'created_at_date',
    },
    {
        title: 'Created time',
        dataIndex: 'created_time',
    },
];

const jobInfoFormTableData = {
    columns: [
        { key: "1", label: "", width: "50%" },
        { key: "2", label: "", width: "50%" },
    ],
    grid: [
        {
            rows: [
                { label: 'Job name', field: ENUMS.FORM_FIELDS.JOB_INFO.JOB_NAME, required: true },
                { label: 'Job type', field: ENUMS.FORM_FIELDS.JOB_INFO.JOB_TYPE, required: true },
                { label: 'Job id', field: ENUMS.FORM_FIELDS.JOB_INFO.JOB_ID, required: true },
                { label: 'AFE #', field: ENUMS.FORM_FIELDS.JOB_INFO.AFE_ID, required: true },
                { label: 'County', field: ENUMS.FORM_FIELDS.JOB_INFO.COUNTY_NAME, required: true },
                { label: 'Basin', field: ENUMS.FORM_FIELDS.JOB_INFO.BASIN_NAME, required: true },
                { label: 'State', field: ENUMS.FORM_FIELDS.JOB_INFO.STATE, required: true },
                { label: 'Start date', field: ENUMS.FORM_FIELDS.JOB_INFO.JOB_START_DATE, required: true },
                { label: 'End date', field: ENUMS.FORM_FIELDS.JOB_INFO.JOB_END_DATE, required: false },
            ]
        }
    ]
}

const padInfoFormTableData = {
    columns: [
        { key: "1", label: "", width: "50%" },
        { key: "2", label: "", width: "50%" },
    ],
    grid: [
        {
            rows: [
                { label: 'Pad name', field: ENUMS.FORM_FIELDS.PAD_INFO.PAD_NAME, required: true },
                { label: 'Pad Id', field: ENUMS.FORM_FIELDS.PAD_INFO.PAD_ID, required: true },
                { label: 'Client name', field: ENUMS.FORM_FIELDS.PAD_INFO.CLIENT_NAME, required: true },
                { label: 'Customer field rep', field: ENUMS.FORM_FIELDS.PAD_INFO.CUSTOMER_FIELD_REP, required: true },
                { label: 'Rep contact #', field: ENUMS.FORM_FIELDS.PAD_INFO.REP_CONTACT_NUMBER, required: true, datatype: 'integer' },
                { label: 'Operator', field: ENUMS.FORM_FIELDS.PAD_INFO.OPERATOR, required: true },
                { label: 'Service company', field: ENUMS.FORM_FIELDS.PAD_INFO.SERVICE_COMPANY, required: true },
                { label: 'Wireline company', field: ENUMS.FORM_FIELDS.PAD_INFO.WIRELINE_COMPANY, required: true },
            ]
        }
    ]
}

const wellInfoFormTableData = {
    columns: [
        { key: "1", label: "Well name", width: "14%", field: ENUMS.FORM_FIELDS.WELL_INFO.WELL_NAME, defaultValue: "", required: true },
        { key: "2", label: "# of stages", width: "13%", field: ENUMS.FORM_FIELDS.WELL_INFO.NO_OF_STAGES, defaultValue: "", required: true, datatype: 'integer' },
        { key: "3", label: "Well API", width: "14%", field: ENUMS.FORM_FIELDS.WELL_INFO.WELL_API, defaultValue: "", required: true },
        { key: "4", label: "Formation", width: "14%", field: ENUMS.FORM_FIELDS.WELL_INFO.FORMATION, defaultValue: "", required: true },
        { key: "5", label: "Lat", width: "14%", field: ENUMS.FORM_FIELDS.WELL_INFO.LAT, defaultValue: "", required: true },
        { key: "6", label: "Long", width: "14%", field: ENUMS.FORM_FIELDS.WELL_INFO.LONG, defaultValue: "", required: true },
        { key: "9", label: "", width: "5%", field: "action", defaultValue: "", actionColumn: true, className: "noborder" },
    ],
    grid: [
        {
            row: "row1"
        }
    ]
}

const wellVolumeFormTableData = {
    columns: [
        { key: "1", label: "Type", width: "16%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.TYPE, required: true },
        { key: "2", label: "OD", width: "16%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.OD, required: true, datatype: 'integer' },
        { key: "2", label: "Wt", width: "17%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.WT, required: true, datatype: 'integer' },
        { key: "2", label: "ID", width: "17%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.ID, required: true, datatype: 'integer' },
        { key: "2", label: "Depth [MD]", width: "17%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.DEPTH_MD, required: true, datatype: 'integer' },
        { key: "2", label: "TOL", width: "17%", field: ENUMS.FORM_FIELDS.WELL_VOLUME.TOL, required: true, datatype: 'integer' },
    ],
    grid: [
        {
            rows: [
                'casing',
                'liner',
                'liner_sec'
            ]
        }
    ]
}

const wellVolumeEstimationsFormTableData = {
    columns: function (wellName) {
        return [
            { key: "1", label: wellName, colSpan: "2" },
        ]
    },
    grid: [
        {
            rows: [
                { label: 'Surface Vol. [bbls]', field: ENUMS.FORM_FIELDS.WELL_VOLUME_ESTIMATIONS.SURFACE_VOL, datatype: 'integer' },
                { label: 'bbls', field: ENUMS.FORM_FIELDS.WELL_VOLUME_ESTIMATIONS.BBLS, datatype: 'integer' },
                { label: 'gallons', field: ENUMS.FORM_FIELDS.WELL_VOLUME_ESTIMATIONS.GALLONS, datatype: 'integer' },
            ]
        }
    ]
}

const clientInfoFormTableData = {
    columns: [
        { key: "1", label: "Client Username", width: "38%", field: ENUMS.FORM_FIELDS.CLIENT_INFO.CLIENT_USERNAME, required: true },
        { key: "2", label: "Title", width: "27%", field: ENUMS.FORM_FIELDS.CLIENT_INFO.TITLE, required: true },
        { key: "3", label: "Password", width: "27%", field: ENUMS.FORM_FIELDS.CLIENT_INFO.PASSWORD, required: true },
        { key: "4", label: "", width: "8%", field: ENUMS.FORM_FIELDS.CLIENT_INFO.ACTION, defaultValue: "", className: "noborder" },
    ],
    grid: [
        {
            rows: [
                ''
            ]
        }
    ]
}

const crewInfoFormTableData = {
    columns: [
        { key: "1", label: "Role", width: "38%", field: ENUMS.FORM_FIELDS.CREW_INFO.ROLE, required: true },
        { key: "2", label: "Name", width: "27%", field: ENUMS.FORM_FIELDS.CREW_INFO.NAME, required: true },
        { key: "3", label: "Shift", width: "27%", field: ENUMS.FORM_FIELDS.CREW_INFO.SHIFT, required: true },
        { key: "4", label: "", width: "8%", field: ENUMS.FORM_FIELDS.CREW_INFO.ACTION, defaultValue: "", className: "noborder" },
    ],
    grid: [
        {
            rows: [
                ''
            ]
        }
    ]
}

const equipmentFormTableData = {
    columns: [
        { key: "1", label: "Equipment", width: "50%" },
        { key: "1", label: "ID #", width: "50%" },
    ],
    grid: [
        {
            rows: [
                { label: 'Trailers', field: ENUMS.FORM_FIELDS.EQUIPMENT.TRAILERS_ID, required: true, datatype: 'integer' },
                { label: 'Powerpack', field: ENUMS.FORM_FIELDS.EQUIPMENT.POWERPACK_ID, required: true, datatype: 'integer' },
                { label: 'Source', field: ENUMS.FORM_FIELDS.EQUIPMENT.SOURCE_ID, required: true, datatype: 'integer' },
                { label: 'Accumulator', field: ENUMS.FORM_FIELDS.EQUIPMENT.ACCUMULATOR_ID, required: true, datatype: 'integer' },
                { label: 'Hydrophones', field: ENUMS.FORM_FIELDS.EQUIPMENT.HYDROPHONES_ID, required: true, datatype: 'integer' },
                { label: 'PSI transducer', field: ENUMS.FORM_FIELDS.EQUIPMENT.PSI_TRANSDUCER_ID, required: true, datatype: 'integer' },
                { label: 'Hotspot', field: ENUMS.FORM_FIELDS.EQUIPMENT.HOTSPOT_ID, required: true, datatype: 'integer' },
            ]
        }
    ]
}

const projectInfoFormTableData = {
    columns: [
        { key: "1", label: "", width: "50%" },
        { key: "1", label: "", width: "50%" },
    ],
    grid: [
        {
            rows: [
                { label: 'Project Name', field: ENUMS.FORM_FIELDS.PROJECT.PROJECT_NAME, required: true },
                { label: 'Project UUID', field: ENUMS.FORM_FIELDS.PROJECT.PROJECT_UUID, required: true },
            ]
        }
    ]
}

const TableHeadersUtil = {
    clientInfoFormTableData,
    crewInfoFormTableData,
    jobInfoFormTableData,
    padInfoFormTableData,
    projectTable,
    wellInfoFormTableData,
    wellVolumeFormTableData,
    wellVolumeEstimationsFormTableData,
    equipmentFormTableData,
    projectInfoFormTableData
}

export default TableHeadersUtil;