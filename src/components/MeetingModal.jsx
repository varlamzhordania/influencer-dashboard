import { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import relationshipsApi from "@/lib/relationships";
import { useAuth } from "../../context/AuthContext";

const { TimePicker } = DatePicker;

function MeetingModal({
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
      title={"Schedule meeting"}
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
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker
            className="w-full"
            format={"MMM DD YYYY"}
            placeholder="Select date"
          />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <Form.Item
            name="startTime"
            label="Start time"
            rules={[{ required: true, message: "Please select start time" }]}
          >
            <TimePicker
              className="w-full"
              format={"hh:mm A"}
              placeholder="Select start time"
            />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End time"
            rules={[{ required: true, message: "Please select end time" }]}
          >
            <TimePicker
              className="w-full"
              format={"hh:mm A"}
              placeholder="Select end time"
            />
          </Form.Item>
        </div>
        <Form.Item name="desc" label="Description">
          <Input.TextArea placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MeetingModal;
