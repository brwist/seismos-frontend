import { Card } from "antd";
import { dataHandlingApi } from "api/dataHandlingApi";
import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomButton from "../../components/Buttons/CustomButton";
import "./Acccount.css";
import UploadFile from "./UploadFile";

// components
export default function Account() {
  const user = useSelector((state) => state.authReducer.user);
  const [percentage, setPercentage] = useState(0);

  const handleDownloadClick = async () => {
    const response = await dataHandlingApi.download();
  };

  const handleUploadClick = async () => {
    const response = await dataHandlingApi.upload();
  };

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

  console.log(percentage);

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
                <a href=" https://storage.googleapis.com/ebay-donation-service/-Wfd3c-tRM1ToH9a_charity.jpg" download>
                  Download
                </a>
              </CustomButton>
            </div>
          </Card>
          <Card style={{ width: "500px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Upload databases file(.sql) to cloud: </div>
              <div className="upload-btn-wrapper">
                <button className="btns">Upload</button>
                <input type="file" name="myfile" onChange={handleFileChange} />
              </div>
            </div>
            {percentage > 1 && <ProgressBar now={percentage} />}
          </Card>
        </div>
      </div>
    </>
  );
}