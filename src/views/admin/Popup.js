import React from "react";
import { Button, Modal } from "react-bootstrap";
import { outline } from "tailwindcss/defaultTheme";
import "./Popup.css";

const Popup = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body className={props.confirm ? "modalCustomDesign" : "modalCustomDesignT"}>{props.bodyText}</Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: props.confirm ? "spaceBetween" : "center" }}>
          {props.confirm ? (
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <div className="upload-btn-wrapper">
                <Button variant="outline-success"> {props.firstButton}</Button>
                <input type="file" name="myfile" onChange={props.handleClickFirst} />
              </div>

              <div className="upload-btn-wrapper">
                <Button variant="outline-success">{props.secondButton}</Button>
                <input type="file" name="myfile" onChange={props.handleClicksecond} />
              </div>

              <Button variant="outline-danger" onClick={props.handleThirdClose}>
                {props.thirdButton}
              </Button>
            </div>
          ) : (
            <div className="">
              <Button variant="primary" onClick={props.okayButtonClick}>
                {props.okayButton}
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;