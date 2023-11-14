import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';

function CreditCardModal({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = () => {
    setIsPurchasing(true);
    form
      .validateFields()
      .then((values) => {
        // Simulate purchase success
        setTimeout(() => {
          onCancel();
          form.resetFields();
          setIsPurchasing(false);
          message.success('Plan purchased successfully');
        }, 1500);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
        setIsPurchasing(false);
        message.error('An error occurred. Please try again.');
      });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Enter Credit Card Information"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="purchase"
          type="primary"
          className="bg-purple-600 hover:bg-purple-600"
          onClick={handlePurchase}
          loading={isPurchasing}
        >
          {isPurchasing ? 'Purchasing...' : 'Purchase'}
        </Button>,
      ]}
    >
      <Form form={form} name="creditCardForm" layout="vertical">
        <Form.Item
          name="cardNumber"
          label="Card Number"
          rules={[
            {
              required: true,
              message: 'Please enter your card number',
            },
          ]}
        >
          <Input placeholder="Card Number" />
        </Form.Item>
        <Form.Item
          name="cardHolder"
          label="Card Holder"
          rules={[
            {
              required: true,
              message: 'Please enter the card holder name',
            },
          ]}
        >
          <Input placeholder="Card Holder Name" />
        </Form.Item>
        <Form.Item
          name="expirationDate"
          label="Expiration Date"
          rules={[
            {
              required: true,
              message: 'Please enter the expiration date',
            },
          ]}
        >
          <Input placeholder="MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="cvv"
          label="CVV"
          rules={[
            {
              required: true,
              message: 'Please enter the CVV code',
            },
          ]}
        >
          <Input placeholder="CVV" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreditCardModal;
