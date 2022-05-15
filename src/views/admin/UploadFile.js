import axios from "axios";
import React from "react";

const UploadFile = async (value, setPercentage) => {
  try {
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);

        if (percent <= 100) {
          setPercentage(percent);
        }
      },
    };

    const { data } = await axios.post("https://nestjs-upload.herokuapp.com/", value, options);
  } catch (err) {
    console.log(err);
  }
};

export default UploadFile;