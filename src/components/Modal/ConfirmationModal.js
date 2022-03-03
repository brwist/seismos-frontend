import React from "react";
import { Modal, Button } from "antd";

export default function ConfirmationModal(props) {
  return (
    <Modal
      centered
      title={props.modalTitle}
      visible={props.isModalVisible}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={(e) => props.handleCancel(e)}>
          {props.footerButtons.cancel_text}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={(e) => props.handleOk(props.data)}
        >
          {props.footerButtons.confirm_text}
        </Button>,
      ]}
    >
      {props.modalText}
    </Modal>
  );
}
