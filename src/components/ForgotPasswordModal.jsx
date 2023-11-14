import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/config/firebase";

function ForgotPasswordModal({ visible, onCancel }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSave = async (values) => {
    setLoading(true);
    await sendPasswordResetEmail(auth, values?.email)
      .then((e) => {
        setMessage(
          `A password reset email sent to ${values?.email}. Please check your email`
        );
        setLoading(false);
      })
      .catch((e) => {
        message.error("Something went wrong, please try later!");
        setLoading(false);
        console.log("Error sending email", e);
      });
  };

  return (
    <Modal
      title={"Reset password"}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSave}>
        {message && <p className="text-base text-green-700">{message}</p>}
        <Form.Item
          name="email"
          label="Your email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
              type: "email",
            },
          ]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        <Form.Item className="flex items-center justify-center">
          <Button className="text-white" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ForgotPasswordModal;
