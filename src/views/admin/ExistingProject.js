import React, { useEffect, useState } from "react";
import { Card, Table, PageHeader, Button } from "antd";
import TableHeadersUtil from "util/TableHeaderUtil";
import { useHistory } from "react-router";
import { projectApi } from "./../../api/projectApi";

// components
export default function ExistingProject() {
  const history = useHistory();
  const columns = TableHeadersUtil.projectTable;
  const [data, setData] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const project = data.find((x) => x.key === selectedRowKeys[0]);
      setSelectedProject(project);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleTableChange = (pagination, filters, sorter) => {
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
      pathname: "/admin/dashboard",
      search: "?projectId=" + projectId,
      state: { projectId: projectId },
    });
  };

  const fetchProjects = async () => {
    try {
      const { projects } = await projectApi.getProjectList();
      setData(
        projects.map((project, index) => {
          return {
            key: index,
            id: project.uuid,
            job_number: project.job_id,
            job_name: project.job_name,
            project_name: project.project_name,
            created_by: project.created_by,
            created_at_date: project.created_date,
            created_time: project.created_time,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    setPagination({
      current: 1,
      pageSize: 5,
      total: 10,
    });
  }, []);

  return (
    <>
      <div style={{ minHeight: "80vh" }} className="flex items-center justify-center bg-white">
        <div style={{ width: "1100px" }}>
          <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="Select a project to continue"
            extra={[
              <Button key="1" type="primary" disabled={selectedProject ? false : true} onClick={(e) => openProject(e)}>
                Next
              </Button>,
            ]}
          />
          <Card>
            <Table
              rowSelection={{
                type: "radio",
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
