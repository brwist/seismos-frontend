import { Button, Card, Divider, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { projectApi } from "../../api/projectApi";
import fileSaver from "../../util/FileSaver";

// components
export default function Account() {
  let history = useHistory();
  const user = useSelector((state) => state.authReducer.user);
  const [projectId, setProjectId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    if (history.location?.state?.projectId) {
      setProjectId(history.location?.state?.projectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const download = async () => {
    setIsDownloading(true);
    try {
      const res = await projectApi.downloadProject(projectId);
      const fileName = `seismos_proj_dump_${moment().format("YYYY_MM_DD_hh_mm")}.zip`;
      fileSaver(res.data, fileName);

      setIsDownloading(false);
      addToast("Download is completed!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (e) {
      setIsDownloading(false);
      addToast(e.response.data.msg || e.message || "Failed. Internal server error.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div style={{ minHeight: "80vh" }} className="flex items-center justify-center bg-white">
      <Space direction="vertical" size="large">
        <Card title="User Account">
          <div>Name: {user.username}</div>
          <div>Email: {user.email}</div>
        </Card>
        {projectId && (
          <Card title="Manual data handling">
            <div className="flex items-center justify-between w-full">
              <p className="mb-0 mr-4">Database file(.sql)</p>
              <Button type="primary" onClick={download} loading={isDownloading} size="large" className="rounded-lg">
                Download
              </Button>
            </div>
            <Divider />
            <div className="flex items-center justify-between w-full">
              <p className="mb-0 mr-4">Upload database file(.sql) to cloud</p>
              <Button type="primary" size="large" className="rounded-lg">
                Upload
              </Button>
            </div>
          </Card>
        )}
      </Space>
    </div>
  );
}
