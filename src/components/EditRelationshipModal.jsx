import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import relationshipsApi from "@/lib/relationships";
import { useAuth } from "../../context/AuthContext";

const { Option } = Select;

function EditRelationshipModal({
  visible,
  onCancel,
  onSave,
  initialValues,
  setInitialValues,
}) {
  const [editForm] = Form.useForm();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const addMutation = useMutation(
    ["relationships"],
    async (data) => {
      await relationshipsApi.addRelationship(data);
      return data;
    },
    {
      onSuccess: () => {
        message.success("Saved successfully!");
        queryClient.invalidateQueries(["relationships"]);
        onCancel();
      },
      onError: () => {
        message.error("Something went wrong, please try later!");
      },
    }
  );

  const updateMutation = useMutation(
    ["relationships"],
    async (data) => {
      return await relationshipsApi.updateRelationship(initialValues?.id, data);
    },
    {
      onSuccess: () => {
        message.success("Updated successfully!");
        queryClient.invalidateQueries(["relationships"]);
        onCancel();
      },
      onError: () => {
        message.error("Something went wrong, please try later!");
      },
    }
  );
  const handleSave = () => {
    editForm.validateFields().then((values) => {
      if (initialValues) {
        updateMutation.mutate({
          ...values,
          dateEmailed: new Date(values?.dateEmailed),
          updatedAt: serverTimestamp(),
        });
      } else {
        addMutation.mutate({
          ...values,
          dateEmailed: new Date(values?.dateEmailed),
          user: user?.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      // setLoading(true);
      // setTimeout(() => {
      //   setLoading(false);
      //   onSave(values);
      //   message.success("Campaign Edited!");
      //   onCancel();
      // }, 1000);
    });
  };

  return (
    <Modal
      title={initialValues ? "Add relationship" : "Edit relationship"}
      visible={visible}
      onCancel={() => {
        onCancel();
        editForm.resetFields();
      }}
      onOk={handleSave}
      footer={[
        <Button key="back" onClick={onCancel} className="mr-2">
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={addMutation.isLoading}
          className="bg-purple-600 hover:bg-purple-600"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
    >
      <Form
        form={editForm}
        initialValues={initialValues}
        labelCol={{ span: 6 }}
        layout="vertical"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="influencerType"
          label="Influencer Type"
          rules={[
            { required: true, message: "Please enter an influencer type" },
          ]}
        >
          <Input placeholder="Enter influencer type" />
        </Form.Item>
        <Form.Item
          name="instaUrl"
          label="Instagram URL"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter Instagram URL" />
        </Form.Item>
        <Form.Item
          name="tiktockUrl"
          label="Tiktok URL"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter Tiktok URL" />
        </Form.Item>
        <Form.Item
          name="ytUrl"
          label="YouTube URL"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter YouTube URL" />
        </Form.Item>
        <Form.Item name="other" label="Other">
          <Input placeholder="Enter other information" />
        </Form.Item>
        <Form.Item name="note" label="Note">
          <Input placeholder="Enter any note (optional)" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter an email address" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            { required: true, message: "Please enter a phone number" },
            {
              pattern: /^[+]\d{2}\s\d{7,14}$/,
              message: "Please enter a valid phone number",
            },
          ]}
        >
          <Input placeholder="Enter phone number (e.g., +91 5456457)" />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select Status!" }]}
        >
          <Select placeholder="Select Status">
            <Option value="Not Started">Not Started</Option>
            <Option value="Shortlisted">Shortlisted</Option>
            <Option value="Outreached">Outreached</Option>
            <Option value="Negotiating">Negotiating</Option>
            <Option value="Hired">Hired</Option>
            <Option value="Product Sent">Product Sent</Option>
            <Option value="Content received">Content received</Option>
            <Option value="Paid">Paid</Option>
            <Option value="On Hold">On Hold</Option>
            <Option value="Declined">Declined</Option>
            <Option value="Ghosted">Ghosted</Option>
            <Option value="Relationship Ended">Relationship Ended</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="label"
          label="Label"
          rules={[{ required: true, message: "Please enter a label" }]}
        >
          <Input placeholder="Enter label" />
        </Form.Item>
        <Form.Item
          name="compaignName"
          label="Campaign Name"
          rules={[{ required: true, message: "Please enter a campaign name" }]}
        >
          <Input placeholder="Enter campaign name" />
        </Form.Item>
        <Form.Item
          name="dMed"
          label="DMed"
          rules={[{ required: true, message: "Please enter DMed information" }]}
        >
          <Input placeholder="Enter DMed information" />
        </Form.Item>
        <Form.Item
          name="emailed"
          label="Emailed"
          rules={[
            { required: true, message: "Please enter email information" },
            { type: "string", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Enter email information" />
        </Form.Item>
        <Form.Item
          name="dateEmailed"
          label="Date Emailed"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD MMM YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditRelationshipModal;
