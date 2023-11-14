import React, { useState } from 'react';
import { Input, DatePicker, Select } from 'antd';
import { message } from 'antd';
const { Option } = Select;
import moment from 'moment';

function PaymentDetails() {
  const admin = {
    firstName: 'James',
    lastName: 'Williams',
    mobileNumber: '+91 54665656',
    emailAddress: 'user@email.com',
    facebookUrl: 'user@facebook',
    dateOfPayment: '12 August 2023',
  };

 
  const initialDateOfPayment = moment(admin.dateOfPayment, 'DD MMMM, YYYY').toDate();

  const [formData, setFormData] = useState({
    ...admin,
    dateOfPayment: initialDateOfPayment,
  });

  const [formUpdated, setFormUpdated] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormUpdated(true);
  };

  const handleSubmit = () => {
    if (formUpdated) {
      message.success('Information Updated!');
      setFormUpdated(false);
    } else {
      message.info('Information is up to date.');
    }
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="font-[700] text-[24px]">Add Payment Details</h1>
      </div>
      <div className="mt-5 mb-3 form">
        <form>
          <div className="mb-4 md:flex md:space-x-2">
            <div className="w-full md:w-1/2">
              <label className="font-semibold block">First Name</label>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
              />
            </div>
            <div className="w-full md:w-1/2 mt-2 md:mt-0">
              <label className="font-semibold block">Last Name</label>
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
              />
            </div>
          </div>
          <div className="mb-4 md:flex md:space-x-2">
            <div className="w-full md:w-1/2">
              <label className="font-semibold block">Mobile Number</label>
              <Input
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
              />
            </div>
            <div className="w-full md:w-1/2 mt-2 md:mt-0">
              <label className="font-semibold block">Address</label>
              <Input
                placeholder="Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
              />
            </div>
          </div>
          <div className="mb-4 md:flex md:space-x-2">
            <div className="w-full md:w-1/2">
              <label className="font-semibold block">Facebook URL</label>
              <Input
                placeholder="Facebook URL"
                value={formData.facebookUrl}
                onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
                className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
              />
            </div>
            <div className="w-full md:w-1/2 mt-2 md:mt-0">
              <label className="font-semibold block date-selector">Mode of Payment</label>
              <Select
                value={formData.paymentMode}
                onChange={(value) => handleInputChange('paymentMode', value)}
                className="border-purple-200 rounded-md w-full"
              >
                <Option value="Online">Online</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Credit Card">Credit Card</Option>
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold block">Date of Payment</label>
            <DatePicker
              className="bg-purple-200 border-purple-200 border rounded-md py-2 px-4 w-full"
            />
          </div>
        </form>
        <div className="mt-4 text-center flex justify-start">
          <button
            onClick={handleSubmit}
            className="gradient-bg text-white py-2 px-4 rounded-md cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
