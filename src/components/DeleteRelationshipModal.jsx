import React from "react";
import { Modal, Button } from "antd";

function DeleteRelationshipModal({
  visible,
  onConfirm,
  onCancel,
  selectedRowData,
}) {
  return (
    <Modal
      title="Delete Relationship"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger
          onClick={() => onConfirm(selectedRowData)}
        >
          Sure
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this relationship?</p>
    </Modal>
  );
}

export default DeleteRelationshipModal;
