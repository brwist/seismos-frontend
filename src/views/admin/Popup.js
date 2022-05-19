import { Button, Modal } from "antd";
import React from "react";

const Popup = (props) => {
  return (
    <Modal
      visible={props.visible}
      onCancel={() => {
        props.setVisible(false);
      }}
      closable={false}
      footer={[
        <div className="w-full flex justify-end">
          <Button type="primary" onClick={props.handleOkClick}>
            Proceed
          </Button>
          <button
            className="bg-grey color-black ml-2 px-4 border-0 outline-0 focus:outline-none "
            onClick={() => {
              props.setVisible(false);
            }}
          >
            Cancel
          </button>
        </div>,
      ]}
    >
      <h5 className="text-lg text-center flex justify-center items-center">{props.popupContent}</h5>
    </Modal>
  );
};

export default Popup;