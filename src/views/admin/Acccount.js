import { Button, Card, Divider, Space } from "antd";
import { dataHandlingApi } from "api/dataHandlingApi";
import Popup from "components/Modal/Popup";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import fileSaver from "../../util/FileSaver";

// components
export default function Account() {
  const history = useHistory();
  const user = useSelector((state) => state.authReducer.user);
  const [percentage, setPercentage] = useState(0);
  const [authModal, setAuthModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
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
      const res = await dataHandlingApi.downloadProject(projectId);
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

  const handleSelectModal = () => {
    const isUserLoggedIn = localStorage.getItem("JWT");
    if (isUserLoggedIn) {
      setUploadModal(true);
    } else if (!isUserLoggedIn) {
      setAuthModal(true);
    }
  };

  const handleOkayClick = () => {
    localStorage.clear();
    history.push("/auth/login");
  };

  const handleCompleteFalse = () => {
    setComplete(false);
    setShowProgress(false);
  };

  const handleClickUpdate = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    try {
      await dataHandlingApi.uploadProject(data);

      addToast("Upload is completed!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (e) {
      addToast(e.response.data.msg || e.message || "Failed. Internal server error.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setUploadModal(false);
  };

  const handleClickCreate = () => {
    setUploadModal(false);
  };

  return (
    <>
      <div style={{ minHeight: "80vh" }} className="flex items-center justify-center bg-white">
        <Space direction="vertical" size="large">
          <Card title="User Account">
            <div>Name: {user.username}</div>
            <div>Email: {user.email}</div>
          </Card>

          <Card title="Manual Data Handling">
            {projectId && (
              <Fragment>
                <div className="flex items-center justify-between w-full">
                  <p className="mb-0 mr-4">Database file(.sql):</p>
                  <Button type="primary" onClick={download} loading={isDownloading} size="large" className="rounded-lg">
                    Download
                  </Button>
                </div>
                <Divider />
              </Fragment>
            )}
            <div className="flex items-center justify-between w-full">
              <p className="mb-0 mr-4">Upload databases file(.sql) to cloud: </p>
              <Button type="primary" onClick={handleSelectModal} size="large" className="rounded-lg">
                Upload
              </Button>
            </div>
            {showProgress && (
              <ProgressBar now={percentage} style={{ margin: 20 }} label={percentage > 100 ? "Uploaded" : percentage} />
            )}
          </Card>
        </Space>
      </div>
      {authModal && (
        <Popup
          show={authModal}
          handleClose={() => {
            setAuthModal(false);
          }}
          bodyText="No user right to write Please contact admin"
          okayButton="OK"
          okayButtonClick={handleOkayClick}
        />
      )}
      {uploadModal && (
        <Popup
          show={uploadModal}
          handleClose={() => {
            setUploadModal(false);
          }}
          bodyText="How do you want to proceed?"
          firstButton="Update Project"
          secondButton="Create New Project"
          thirdButton="Cancel"
          handleClickFirst={handleClickUpdate}
          handleClicksecond={handleClickCreate}
          handleThirdClose={() => setUploadModal(false)}
          okayButtonClick={handleOkayClick}
          confirm
        />
      )}
      {complete && (
        <Popup
          show={complete}
          handleClose={() => {
            setAuthModal(false);
            setPercentage(true);
          }}
          bodyText="Operation has completed Successfully"
          okayButton="OK"
          okayButtonClick={handleCompleteFalse}
        />
      )}
    </>
  );
}
