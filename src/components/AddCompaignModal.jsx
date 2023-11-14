import React, { useState } from "react";
import { Modal, Form, Input, Button, message, DatePicker } from "antd";
import compaignsApi from "@/lib/compaigns";
import { useAuth } from "../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import NotEligible from "./NotEligible";

const AddCompaignModal = ({
  visible,
  onCancel,
  onAdd,
  isEligible,
  userPlan,
}) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const mutation = useMutation(
    ["campaigns"],
    async (data) => {
      return await compaignsApi.addCompaign({
        ...data,
        userId: user?.uid,
        createdOn: dayjs(data?.createdOn).toDate(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns"]);
        queryClient.invalidateQueries(["userplan"]);
        message.success("Campaign created!");
        handleCancel();
      },
    }
  );

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      title={
        userPlan?.campaignUsage && userPlan?.campaignUsage !== 0
          ? "Add Campaign"
          : ""
      }
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      {(userPlan?.campaignUsage && userPlan?.campaignUsage !== 0) ||
      user?.admin ? (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Campaign"
            name="campaign"
            rules={[{ required: true, message: "Please enter Campaign!" }]}
          >
            <Input placeholder="Enter Campaign" />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter Brand!" }]}
          >
            <Input placeholder="Enter Brand" />
          </Form.Item>
          <Form.Item
            label="Post"
            name="post"
            rules={[
              { required: true, message: "Please enter Post!", type: "url" },
            ]}
          >
            <Input placeholder="https://www.example.com" />
          </Form.Item>
          <Form.Item
            label="Created On"
            name="createdOn"
            rules={[{ required: true, message: "Please select date!" }]}
          >
            <DatePicker className="w-full" placeholder="Created on" />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              loading={mutation.isLoading}
              className="bg-purple-600 hover:bg-purple-600"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="mt-10">
          <NotEligible
            title="Upgrade to add more campaigns"
            text="Add and analyze campaigns and share with your clients"
          />
        </div>
      )}
    </Modal>
  );
};

export default AddCompaignModal;
