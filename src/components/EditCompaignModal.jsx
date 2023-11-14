import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd"; // Import DatePicker from 'antd'
import moment from "moment";

const EditCompaignModal = ({ visible, onCancel, onEdit, initialData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        campaign: initialData.campaign,
        brand: initialData.brand,
        post: initialData.post,
        created: moment(initialData.created, "DD MMM YYYY").isValid()
          ? moment(initialData.created, "DD MMM YYYY")
          : null,
      });
    }
  }, [visible, form, initialData]);
  

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onEdit(values);
      message.success("Campaign Edited!");
      onCancel();
    }, 1000);
  };

  return (
    <Modal title="Edit Campaign" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Campaign"
          name="campaign"
          rules={[{ required: true, message: "Please enter Campaign!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter Brand!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Post"
          name="post"
          rules={[{ required: true, message: "Please enter Post!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Created"
          name="created"
          rules={[{ required: true, message: "Please enter Created On!" }]}
        >
          <DatePicker format="DD MMM YYYY" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-purple-600 hover:bg-purple-600"
          >
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCompaignModal;
