import React from "react";
import { Form, Input } from 'antd';

const LIST_OF_PROJECTS = [
    {
        key: '1',
        job_number: '222-555',
        project_name: 'Construction',
        created_by: 'Josh William',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '2',
        job_number: '242-515',
        project_name: 'Oil extraction',
        created_by: 'Peter Sam',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '3',
        job_number: '123-222',
        project_name: 'Construction',
        created_by: 'Raymond Hillary',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '4',
        job_number: '434-231',
        project_name: 'Construction',
        created_by: 'Cogba Jua',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '5',
        job_number: '290-213',
        project_name: 'Construction',
        created_by: 'Rock Van Dam',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '6',
        job_number: '116-435',
        project_name: 'Construction',
        created_by: 'Josh William',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '7',
        job_number: '989-213',
        project_name: 'Oil extraction',
        created_by: 'Peter Sam',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '8',
        job_number: '323-123',
        project_name: 'Construction',
        created_by: 'Raymond Hillary',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '9',
        job_number: '323-434',
        project_name: 'Construction',
        created_by: 'Cogba Jua',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
    {
        key: '10',
        job_number: '654-434',
        project_name: 'Construction',
        created_by: 'Rock Van Dam',
        created_at_date: '2021-03-04',
        created_time: '15:43:23',
    },
]

const WELL_INFO_FORM = [
    {
        key: '1',
        well_name: 'Well 1',
        well_api: <Form.Item
            name="well_api1"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        formation: <Form.Item
            name="formation1"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        lat: <Form.Item
            name="lat1"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
    },
    {
        key: '2',
        well_name: 'Well 2',
        well_api: <Form.Item
            name="well_api2"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        formation: <Form.Item
            name="formation2"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        lat: <Form.Item
            name="lat2"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
    },
    {
        key: '3',
        well_name: 'Well 3',
        well_api: <Form.Item
            name="well_api3"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        formation: <Form.Item
            name="formation3"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
        lat: <Form.Item
            name="lat3"
            rules={[
                {
                    required: true,
                    message: '',
                },
            ]}
        >
            <Input placeholder="Please input your name" />
        </Form.Item>,
    }
]

const projectData = {
    "jobInfoValues": {
        "job_name": "j",
        "job_type": "j",
        "job_id": "l",
        "afe_num": "l",
        "county": "l",
        "basin": "l",
        "state": "l",
        "start_date": "l"
    },
    "padInfoValues": {
        "pad_name": "o",
        "pad_id": "o",
        "client_name": "o",
        "customer_field_rep": "o",
        "rep_contact_number": "o",
        "operator": "o",
        "service_company": "o",
        "wireline_company": "o"
    },
    "wellInfoValues": [
        {
            id: 1,
            "well_name": "Test Well 1",
            "no_of_stages": "5",
            "well_api": "u",
            "formation": "k",
            "lat": "k",

        },
        {
            id: 2,
            "well_name": "Test Well 2",
            "no_of_stages": "5",
            "well_api": "h",
            "formation": "l",
            "lat": "l",

        }
    ],
    "wellVolumeValues": [
        [
            {
                "type": "Casing",
                "od": "v",
                "wt": "j",
                "id": "j",
                "depth_md": "j",
                "tol": "h"
            },
            {
                "type": "Liner #1",
                "od": "l",
                "wt": "l",
                "id": "l",
                "depth_md": "l",
                "tol": "l"
            },
            {
                "type": "Liner #2",
                "od": "l",
                "wt": "l",
                "id": "l",
                "depth_md": "l",
                "tol": "l"
            }
        ],
        [
            {
                "type": "Casing",
                "od": "c",
                "wt": "W",
                "id": "W",
                "depth_md": "w",
                "tol": "w"
            },
            {
                "type": "w",
                "od": "s",
                "wt": "s",
                "id": "s",
                "depth_md": "sw",
                "tol": "s"
            },
            {
                "type": "Liner #2",
                "od": "e",
                "wt": "e",
                "id": "s",
                "depth_md": "e",
                "tol": "s"
            }
        ]
    ],
    "wellVolumeEstimationsValues": [],
    "clientInfoValues": [
        {
            "clientusername": "b",
            "title": "b",
            "password": "b"
        }
    ],
    "crewInfoValues": [
        {
            "role": "Engineering manager",
            "name": "h",
            "contact": "j"
        },
        {
            "role": "Field engineer",
            "name": "h",
            "contact": "j"
        },
        {
            "role": "Field engineer",
            "name": "j",
            "contact": "j"
        },
        {
            "role": "Field engineer",
            "name": "j",
            "contact": "j"
        }
    ],
    "equipmentValues": {
        "trailers": "m",
        "powerpack": "m",
        "source": "m",
        "accumulator": "m",
        "hydrophones": "m",
        "psi_transducer": "m",
        "hotspot": "m"
    }
};

const STAGE_REPORT = [
    {
        key: '1',
        c0: '1',
        c1: 0,
        c2: 6,
        c3: 83,
        q0: 6.2,
        q1: 541,
        q2: 0.6,
        q3: 141,
        fit_error: '',
        nf_param_id: 0.64,
        connect_ops_risk: 0.64,
        connect_efficiency: 0.64,
        connect_condition: 0.64,
    },
    {
        key: '2',
        c0: '2',
        c1: 0,
        c2: 6,
        c3: 83,
        q0: 6.2,
        q1: 541,
        q2: 0.6,
        q3: 141,
        fit_error: '',
        nf_param_id: 0.64,
        connect_ops_risk: 0.64,
        connect_efficiency: 0.64,
        connect_condition: 0.64,
    },
    {
        key: '3',
        c0: '3',
        c1: 0,
        c2: 6,
        c3: 83,
        q0: 6.2,
        q1: 541,
        q2: 0.6,
        q3: 141,
        fit_error: '',
        nf_param_id: 0.64,
        connect_ops_risk: 0.64,
        connect_efficiency: 0.64,
        connect_condition: 0.64,
    },
    {
        key: '4',
        c0: '4',
        c1: 0,
        c2: 6,
        c3: 83,
        q0: 6.2,
        q1: 541,
        q2: 0.6,
        q3: 141,
        fit_error: '',
        nf_param_id: 0.64,
        connect_ops_risk: 0.64,
        connect_efficiency: 0.64,
        connect_condition: 0.64,
    },
    {
        key: '5',
        c0: '5',
        c1: 0,
        c2: 6,
        c3: 83,
        q0: 6.2,
        q1: 541,
        q2: 0.6,
        q3: 141,
        fit_error: '',
        nf_param_id: 0.64,
        connect_ops_risk: 0.64,
        connect_efficiency: 0.64,
        connect_condition: 0.64,
    },
];

const FAKE_DATA = {
    LIST_OF_PROJECTS,
    WELL_INFO_FORM,
    projectData,
    STAGE_REPORT
}

export default FAKE_DATA;