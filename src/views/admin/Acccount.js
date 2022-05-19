import { Button, Card, Divider, Modal, Space } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useToasts } from "react-toast-notifications";
import { projectApi } from "../../api/projectApi";
import fileSaver from "../../util/FileSaver";
import Popup from "./Popup";

// components
export default function Account() {
  let history = useHistory();
  const user = useSelector((state) => state.authReducer.user);
  const [projectId, setProjectId] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [projectPopup, setProjectPopup] = useState(false);
  const [projectPopupType, setProjectPopupType] = useState("");
  const [popupContent, setPopupContent] = useState("");
  const [popup, setPopup] = useState(false);
  const { addToast } = useToasts();
  const inputFile = useRef(null);

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

  const handleUploadClick = () => {
    setAuthModal(true);
  };

  const handleOkClick = () => {
    setAuthModal(false);

    inputFile.current.click();
  };

  const handleFileChange = ({ target }) => {
    if (target.files[0]) {
      setProjectPopupType(target.files[0].type);
      if (popup == false) {
        setPopup(true);
      } else if (popup == true) {
        setPopup(false);
      }
      if (popup) {
        setPopupContent("A new project will be created");
      } else {
        setPopupContent("The project already exists, data will be replaced");
      }
      target.value = "";
      setProjectPopup(true);
    }
  };

  const handleProceed = () => {
    if (popup) {
      //Proceed with create project
      setProjectPopup(false);
      console.log("create");
    } else {
      console.log("update");
      setProjectPopup(false);
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
              <Button type="primary" size="large" className="rounded-lg" onClick={handleUploadClick}>
                Upload
              </Button>
            </div>
          </Card>
        )}
      </Space>
      <input type="file" ref={inputFile} onChange={handleFileChange} className="hidden" accept=".zip,.rar,.7zip" />
      {authModal && (
        <Modal
          visible={authModal}
          onCancel={() => {
            setAuthModal(false);
          }}
          closable={false}
          footer={[
            <div className="w-full flex justify-center">
              <Button type="primary" onClick={handleOkClick}>
                OK
              </Button>
            </div>,
          ]}
        >
          <h5 className="text-lg text-center">
            No user right to write. <br /> Contact Admin
          </h5>
        </Modal>
      )}
      {projectPopup && (
        <Popup
          visible={projectPopup}
          setVisible={setProjectPopup}
          popupContent={popupContent}
          handleOkClick={handleProceed}
        />
      )}
    </div>
  );
}