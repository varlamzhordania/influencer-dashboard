import Head from "next/head";
import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Dropdown,
  Menu,
  Table,
  Card,
  Pagination,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AddCompaignModal from "@/components/AddCompaignModal";
import EditCompaignModal from "@/components/EditCompaignModal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import compaignsApi from "@/lib/compaigns";
import { useAuth } from "../../../context/AuthContext";
import dayjs from "dayjs";
import Link from "next/link";
import influencersApi from "@/lib/influencers";
import Loader from "@/components/Loader";

function Compaign() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [analyzeUrl, setAnalyzeUrl] = useState("");
  const queryClient = useQueryClient();
  const [isEligible, setIsEligible] = useState(true);
  const itemsPerPage = 6;
  const { user } = useAuth();

  const { data, isLoading } = useQuery(
    ["campaigns"],
    async () => {
      const res = await compaignsApi.getCompaigns(user?.uid);
      const userPlan = await influencersApi.getUserPlan(user?.uid);
      if (
        (!userPlan ||
          !userPlan?.campaignUsage ||
          userPlan?.campaignUsage <= 0) &&
        !user?.admin
      ) {
        setIsEligible(false);
      } else {
        setIsEligible(true);
      }
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: userPlan, isLoading: userPlanLoading } = useQuery(
    ["userplan"],
    async () => {
      const userPlan = await influencersApi.getUserPlan(user?.uid);

      return userPlan;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteMutation = useMutation(
    ["campaigns"],
    async () => {
      return await compaignsApi.deleteCompaign(selectedRow?.id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["campaigns"]);
        message.success("Campaign deleted!");
      },
    }
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setSelectedRow(record);
    setDeleteModalVisible(true);
  };

  const showEditModal = (record) => {
    setSelectedRow(record);
    setEditModalVisible(true);
  };
  const handleDelete = () => {
    setDeleteModalVisible(false);
    deleteMutation.mutate();
  };

  // const data = [
  //   {
  //     id: 1,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 2,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 3,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 4,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 5,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 6,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 7,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 8,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 9,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  //   {
  //     id: 10,
  //     campaign: "FeastFest",
  //     brand: "Feastables",
  //     post: 24,
  //     created: "17 Aug 2023",
  //   },
  // ];

  const handleSubmit = () => {
    if (analyzeUrl !== "") {
      router.push({
        pathname: `/campaign/analyze`,
        query: { url: analyzeUrl },
      });
    }
  };

  const columns = [
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Compaign</h1>,
      dataIndex: "campaign",
      className: "fontMonst",
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Brand</h1>,
      dataIndex: "brand",
      className: "fontMonst",
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Post</h1>,
      dataIndex: "post",
      className: "fontMonst",
      render: (_, record) => (
        <Link
          href={{
            pathname: `/campaign/analyze`,
            query: { url: record?.post },
          }}
        >
          {record?.post}
        </Link>
      ),
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Created At</h1>
      ),
      dataIndex: "createdAt",
      className: "fontMonst",
      render: (_, record) => dayjs(record?.createdOn).format("MMM DD YYYY"),
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Actions</h1>,
      key: "actions",
      className: "fontMonst",
      render: (record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="edit"
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                icon={<DeleteOutlined />}
                onClick={() => showDeleteModal(record)}
              >
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button
            style={{ background: "#AF1FFC", color: "white", fontWeight: 600 }}
          >
            <Image
              src="/images/edit.svg"
              width={15}
              height={15}
              preview={false}
            />
          </Button>
        </Dropdown>
      ),
    },
  ];
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = data.slice(startIndex, endIndex);

  // const tableData = paginatedData.map((record, index) => (
  //   <Card
  //     key={record.id}
  //     className="shadow-sm"
  //     title={
  //       <div className="flex justify-between items-center ">
  //         <span>{record.campaign}</span>
  //         <Dropdown
  //           overlay={
  //             <Menu>
  //               <Menu.Item
  //                 key="edit"
  //                 icon={<EditOutlined />}
  //                 onClick={() => showEditModal(record)}
  //               >
  //                 Edit
  //               </Menu.Item>
  //               <Menu.Item
  //                 key="delete"
  //                 icon={<DeleteOutlined />}
  //                 onClick={() => showDeleteModal(record)}
  //               >
  //                 Delete
  //               </Menu.Item>
  //             </Menu>
  //           }
  //         >
  //           <Button
  //             style={{ background: "#AF1FFC", color: "white", fontWeight: 600 }}
  //           >
  //             <Image
  //               src="/images/edit.svg"
  //               width={15}
  //               height={15}
  //               preview={false}
  //             />
  //           </Button>
  //         </Dropdown>
  //       </div>
  //     }
  //     size="small"
  //     style={{ margin: "8px 0" }}
  //   >
  //     <div className="flex flex-col">
  //       <div>
  //         <strong>Brand:</strong> {record.brand}
  //       </div>
  //       <div>
  //         <strong>Posts:</strong> {record.post}
  //       </div>
  //       <div>
  //         <strong>Created On:</strong> {record.created}
  //       </div>
  //     </div>
  //   </Card>
  // ));

  if (userPlanLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full">
      <Head>
        <title>Campaign</title>
      </Head>
      <div className="bg-white h-full my-4 mx-2 rounded-md fontMonst py-5 px-5">
        <div className="bg-[#5a55ef9d] p-2 sm:px-[2rem] sm:py-6 rounded-md mb-6">
          <div>
            <h1 className="text-[24px] font-[700] text-[#262464]">
              Get Detailed insights on any social media post
            </h1>
          </div>
          <div className="mb-4">
            <p className="text-[16px] font-[500] text-[#262464]">
              Analyze engagement stats, audience reactions, and more
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border border-[#ADA9BB] bg-white px-4 py-2 rounded-lg flex-grow focus:outline-none"
              placeholder="Enter post URL"
              onChange={(e) => setAnalyzeUrl(e.target.value)}
            />

            <button
              onClick={() => handleSubmit()}
              className="bg-[#AF1FFC] text-white px-4 py-2 rounded-lg"
            >
              Analyze
            </button>
          </div>
        </div>

        <div className="flex w-full justify-center sm:justify-between items-center">
          <h1 className="font-[700] text-[24px]  text-center fontMonst hidden sm:inline">
            Campaign
          </h1>
          <button
            onClick={showModal}
            style={{
              background:
                "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
              color: "white",
              fontWeight: 400,
            }}
            className="py-3 px-3 rounded-md fontRob flex items-center"
          >
            <PlusOutlined />
            <p className="ml-1"> Add new Compaign</p>
          </button>
        </div>

        <div className="compaign my-4">
          <Table
            dataSource={data}
            columns={columns}
            // pagination={false}
            loading={isLoading}
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (event) => {
            //       router.push({
            //         pathname: `/campaign/analyze`,
            //         query: { url: record?.post },
            //       });
            //     },
            //   };
            // }}
            rowClassName={(record, index) =>
              (index + 1) % 2 === 1
                ? "bg-[#AF1FFC17] cursor-pointer"
                : "cursor-pointer"
            }
            className="fontMonst"
            scroll={{ x: 1000 }}
          />
        </div>
      </div>
      <AddCompaignModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onAdd={(values) => {
          console.log("Added Campaign Data:", values);
        }}
        isEligible={isEligible}
        userPlan={userPlan}
      />

      <Modal
        title="Delete Campaign"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="no" onClick={() => setDeleteModalVisible(false)}>
            No
          </Button>,
          <Button
            key="yes"
            loading={deleteMutation.isLoading}
            type="primary"
            danger
            onClick={handleDelete}
          >
            Sure
          </Button>,
        ]}
      >
        Are you sure you want to delete the campaign?
      </Modal>

      <EditCompaignModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onEdit={(values) => {
          console.log("Edited Campaign Data:", values);
        }}
        initialData={selectedRow}
      />
    </div>
  );
}

export default Compaign;
