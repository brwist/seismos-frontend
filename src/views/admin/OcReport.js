import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, Space, Table, Button, Row, Col } from "antd";
import FAKE_DATA from "constants/fakeData";
import _ from "lodash";
import { ReloadOutlined } from "@ant-design/icons";
import { CSVLink, CSVDownload } from "react-csv";
import { projectApi } from "./../../api/projectApi";

export default function OcReport() {
  const history = useHistory();
  const [data, setData] = useState(FAKE_DATA.STAGE_REPORT);

  const csvData = [
    [
      "C0",
      "C1",
      "C2",
      "C3",
      "Q0",
      "Q1",
      "Q2",
      "Q3",
      "Fit Error",
      "Nf Param Id",
      "Connect Ops Risk",
      "Connect Efficiency",
      "Connect Condition",
    ],
    ["1", 0, 6, 83, 6.2, 541, 0.6, 141, "", 0.64, 0.64, 0.64, 0.64],
  ];
  const approveStage = (text, record) => {
    const index = data.findIndex((d) => d.key === record.key);
    const newData = _.cloneDeep(data);
    newData[index].approved = true;
    setData(newData);
  };

  const columns = [
    {
      title: "C0",
      dataIndex: "c0",
      key: "c0",
    },
    {
      title: "C1",
      dataIndex: "c1",
      key: "c1",
    },
    {
      title: "C2",
      dataIndex: "c2",
      key: "c2",
    },
    {
      title: "C3",
      dataIndex: "c3",
      key: "c3",
    },
    {
      title: "Q0",
      dataIndex: "q0",
      key: "q0",
    },
    {
      title: "Q1",
      dataIndex: "q1",
      key: "q1",
    },
    {
      title: "Q2",
      dataIndex: "q2",
      key: "q2",
    },
    {
      title: "Q3",
      dataIndex: "q3",
      key: "q3",
    },
    {
      title: "Fit Error",
      dataIndex: "fit_error",
      key: "fit_error",
    },
    {
      title: "Nf Param Id",
      dataIndex: "nf_param_id",
      key: "nf_param_id",
    },
    {
      title: "Connect Ops Risk",
      dataIndex: "connect_ops_risk",
      key: "connect_ops_risk",
    },
    {
      title: "Connect Efficiency",
      dataIndex: "connect_efficiency",
      key: "connect_efficiency",
    },
    {
      title: "Connect Condition",
      dataIndex: "connect_condition",
      key: "connect_condition",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.approved ? (
            "Approved"
          ) : (
            <Button type="primary" onClick={(e) => approveStage(text, record)}>
              Approve
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const renderBody = (props, columns) => {
    return <tr className={props.className}>{columns.map((item, idx) => !item.hidden && props.children[idx])}</tr>;
  };

  const fetchQcReport = useCallback(async () => {
    try {
      const { wellId } = history.location.state;
      const data = await projectApi.getQcReport(wellId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, [history.location.state]);

  useEffect(() => {
    fetchQcReport();
  }, [fetchQcReport, history]);

  const syncCloud = async () => {
    const { projectId } = history.location.state;
    const data = await projectApi.syncCloud(projectId);
    console.log(data);
  };

  return (
    <>
      <Card bordered={false} style={{ width: "100%", marginBottom: "5px" }}>
        <div className="">
          <Row gutter={24} className="flex items-center">
            <Col span={20}>
              <div>
                <strong>QC Report</strong>
              </div>
            </Col>
            <Col span={4}>
              <div>
                <Button type="secondary">
                  <ReloadOutlined /> Refresh
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <Card>
        <Table
          columns={columns}
          dataSource={data}
          components={{
            body: {
              row: (props) => renderBody(props, columns),
            },
          }}
        />
        <div className="">
          <Row gutter={24} className="flex items-center">
            <Col span={20}>
              <Button type="primary" className="ml-3">
                <CSVLink data={csvData}>Save Report</CSVLink>
              </Button>
            </Col>
            <Col span={3}>
              <div>
                <Button type="primary" onClick={syncCloud}>
                  Sync to cloud
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}
