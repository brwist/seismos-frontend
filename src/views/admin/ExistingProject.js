import React, { useEffect, useState } from "react";
import config from "config";
import axios from "axiosConfig";
import { Card, Table, PageHeader, Button} from 'antd';
import TableHeadersUtil from "util/TableHeaderUtil";
import { useHistory } from "react-router";
import ENUMS from "constants/appEnums";
import HttpUtil from "util/HttpUtil";
// components
export default function ExistingProject() {
    const history = useHistory();
    const columns = TableHeadersUtil.projectTable;
    const [data, setData] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const project = data.find(x => x.key === selectedRowKeys[0]);
            setSelectedProject(project);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('here')
        // this.fetch({
        //   sortField: sorter.field,
        //   sortOrder: sorter.order,
        //   pagination,
        //   ...filters,
        // });
    };
    
    const [pagination, setPagination] = useState({});

    const openProject = (e) => {
        e.preventDefault();
        const projectId = selectedProject.id;
        history.push({
            pathname: '/admin/dashboard',
            search: '?projectId=' + projectId,
            state: { projectId: projectId }
        });
    }

    const fetchProjects = () => {
        axios.get(config.API_URL + ENUMS.API_ROUTES.PROJECT_LIST,
            {
                ...HttpUtil.adminHttpHeaders()
            })
            .then(res => {
                if (res.status === 200 && res.data) {
                    setData(res.data.projects.map((project, index) => {
                        return {
                            key: index,
                            job_number: project.job_id,
                            id: project.id,
                            job_name: project.job_name,
                            project_name: project.project_name,
                            created_by: project.created_by,
                            created_at_date: project.created_date,
                            created_time: project.created_time,
                        }
                    }))
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        fetchProjects();
        setPagination({
            current: 1,
            pageSize: 5,
            total: 10,
        })
    }, [])

    return (
        <>
            <div style={{minHeight: "80vh"}} className="flex justify-center items-center bg-white">
                <div style={{width: '1100px'}}>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="Select a project to continue"
                    extra={[
                        <Button
                            key="1"
                            type="primary"
                            disabled={selectedProject ? false : true}
                            onClick={e => openProject(e)}
                        >
                            Next
                        </Button>,
                    ]}
                    >
                </PageHeader>
                    <Card>
                        <Table
                            rowSelection={{
                                type: 'radio',
                                ...rowSelection,
                            }}
                            pagination={false}
                            columns={columns}
                            dataSource={data}
                            onChange={handleTableChange}
                        />
                    </Card>
                </div>
            </div>
        </>
    );
}
