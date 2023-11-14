import React from "react";
import Head from "next/head";
import PaymentDetails from "@/components/PaymentDetails";
import { useQuery } from "@tanstack/react-query";
import paymentApi from "@/lib/payment";
import { useAuth } from "../../../context/AuthContext";
import moment from "moment";
import { Table } from "antd";

function Payment() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery(["user-payments"], async () => {
    const res = await paymentApi.getUserPayments(user?.uid);
    return res;
  });

  const columns = [
    {
      title: <span className="font-bold text-sm">Payment Date</span>,
      dataIndex: "purchaseDate",
      render: (_, record) =>
        moment(record?.purchaseDate).format("MMM DD YYYY, hh:mm A"),
    },
    {
      title: <span className="font-bold text-sm">Status</span>,
      dataIndex: "status",
      render: (_, record) => (
        <span
          className={`capitalize rounded-full px-4 py-1 font-semibold ${
            record?.status === "paid"
              ? "text-green-700 bg-green-200"
              : "to-red-700 bg-red-200"
          }`}
        >
          {record?.status}
        </span>
      ),
    },
    {
      title: <span className="font-bold text-sm">Payment Purpose</span>,
      dataIndex: "purpose",
    },
    {
      title: <span className="font-bold text-sm">Plan Purchased</span>,
      dataIndex: "plan",
    },
    {
      title: <span className="font-bold text-sm">Amount</span>,
      dataIndex: "amount",
      render: (_, record) => (record?.amount ? `$ ${record?.amount}` : ""),
    },
  ];

  return (
    <div className="h-full">
      <Head>
        <title>Payment Details</title>
      </Head>
      <div className=" h-full w-full bg-white my-4 mx-2 rounded-md fontMonst py-5 px-5">
        {/* <PaymentDetails /> */}
        <Table
          dataSource={data}
          columns={columns}
          loading={isLoading}
          scroll={{ x: 600 }}
        />
      </div>
    </div>
  );
}

export default Payment;
