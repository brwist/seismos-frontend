import { Card } from "antd";
import { dataHandlingApi } from "api/dataHandlingApi";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CustomButton from "../../components/Buttons/CustomButton";
import "./Acccount.css";
import Popup from "./Popup";
import UploadFile from "./UploadFile";

// components
export default function Account() {
  const user = useSelector((state) => state.authReducer.user);
  const [percentage, setPercentage] = useState(0);
  const [authModal, setAuthModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const history = useHistory();
  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const handleDownloadClick = async () => {
    const response = await dataHandlingApi.download();
  };

  const handleUploadClick = async () => {
    const response = await dataHandlingApi.upload();
  };

  useEffect(() => {
    if (start) {
      if (percentage > 100) {
        setComplete(true);
        return;
      }
      const interval = setInterval(() => {
        setPercentage((percentage) => percentage + Math.floor(Math.random() * (20 - 10 + 1) + 10));
        console.log("asdasd");
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [percentage, start]);

  const handleFileChange = async (e) => {
    try {
      console.log(e.target.files[0]);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      await UploadFile(formData, setPercentage);
      setPercentage(0);
    } catch (error) {
      setPercentage(0);
      console.log(error);
    }
  };

  const handleOpenFirstModal = () => {
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

  const handleClickUpdate = () => {
    setStart(true);
    setUploadModal(false);
    setShowProgress(true);
  };

  const handleClickCreate = () => {
    setStart(true);
    setUploadModal(false);
    setShowProgress(true);
  };

  return (
    <>
      <div style={{ minHeight: "80vh" }} className="flex items-center justify-center bg-white">
        <div>
          <Card title="User Account" style={{ width: "500px", marginBottom: "10px" }}>
            <div>Name: {user.username}</div>
            <div>Email: {user.email}</div>
          </Card>
          <Card title="Manual Data Handling" style={{ width: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Database file(.sql):</div>
              <CustomButton
                name={"Download"}
                value={"Download"}
                label={"Download"}
                action={"Download"}
                // handleClick={handleDownloadClick}
              >
                <a
                  style={{ color: "white" }}
                  href=" https://storage.googleapis.com/ebay-donation-service/-Wfd3c-tRM1ToH9a_charity.jpg"
                  download
                >
                  Download
                </a>
              </CustomButton>
            </div>
          </Card>
          <Card style={{ width: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Upload databases file(.sql) to cloud: </div>
              <div className="upload-btn-wrapper">
                <button className="btns" onClick={handleOpenFirstModal}>
                  Upload
                </button>
              </div>
            </div>
            {showProgress && (
              <ProgressBar now={percentage} style={{ margin: 20 }} label={percentage > 100 ? "Uploaded" : percentage} />
            )}
          </Card>
        </div>
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