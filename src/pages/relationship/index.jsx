import Head from "next/head";
import React, { useRef, useState } from "react";
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
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import * as xlsx from "xlsx";
import EditRelationshipModal from "@/components/EditRelationshipModal";
import DeleteRelationshipModal from "@/components/DeleteRelationshipModal";
import Image from "next/image";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import relationshipsApi from "@/lib/relationships";
import { useAuth } from "../../../context/AuthContext";
import { serverTimestamp } from "firebase/firestore";
import Loader from "../../components/Loader"

function Relationship() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editForm] = Form.useForm();
  const [editFormData, setEditFormData] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const fileInputRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: relationships, isLoading } = useQuery(
    ["relationships"],
    async () => {
      const response = await relationshipsApi.getRelationships(user?.uid);
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const showEditModal = (record) => {
    setEditFormData({
      ...record,
      dateEmailed: moment(record.dateEmailed),
    });
    setEditModalVisible(true);
  };

  const handleEditSave = (values) => {
    setEditModalVisible(false);
  };

  const hideEditModal = () => {
    setEditModalVisible(false);
  };

  const showDeleteModal = (record) => {
    setSelectedRowData(record);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleEdit = (updatedData) => {
    const rowIndex = data.findIndex((item) => item.id === selectedRowData.id);

    if (rowIndex !== -1) {
      const newData = [...data];
      newData[rowIndex] = updatedData;
      setData(newData);

      hideEditModal();

      message.success("Row updated successfully");
    } else {
      message.error("Row not found");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const deleteMutation = useMutation(
    ["relationships"],
    async (id) => {
      return relationshipsApi.deleteRelationship(id);
    },
    {
      onSuccess: () => {
        message.success("Deleted successfully!");
        setDeleteModalVisible(false);
        setSelectedRowData(null);
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const newData = new Uint8Array(event.target.result);
      const workbook = xlsx.read(newData, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const excelJson = xlsx.utils.sheet_to_json(sheet, { header: 1 });
      const headers = excelJson[0];
      const rows = excelJson.slice(1);

      const dataArray = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
      let dataToSave = [];
      dataArray.forEach((e) => {
        const referenceDate = new Date("1900-01-01");
        referenceDate.setDate(referenceDate.getDate() + e["Date Emailed"] - 2);

        dataToSave.push({
          name: e?.Name,
          influencerType: e["Influencer Type"],
          instaUrl: e["Instagram URL"],
          tiktockUrl: e["Tiktok URL"],
          ytUrl: e["Youtube URL"],
          email: e?.Email,
          phone: e?.Phone,
          status: e?.Status,
          compaignName: e["Compaign Name"],
          emailed: e["Emailed"],
          dMed: e?.Dmed,
          dateEmailed: referenceDate,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          user: user?.uid,
        });
      });

      await relationshipsApi.addBulkRelationships(dataToSave);
      queryClient.invalidateQueries(["relationsips"]);
    };

    message.success({
      content: `Data imported successfully`,
    });

    reader.readAsArrayBuffer(file);
  };

  const handleDelete = (data) => {
    deleteMutation.mutate(data?.id);
  };

  const data = [
    {
      id: 1,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Shortlisted",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 2,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Not Started",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 3,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Hired",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 4,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Sent",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 5,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Shortlisted",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 6,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Not Started",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 7,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Hired",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
    {
      id: 8,
      name: "James Williams",
      influencerType: "Tictoker",
      instaUrl: "user@instagram.com",
      tiktockUrl: "user@tiktok.com",
      ytUrl: "user@youtube.com",
      other: "user@facebook",
      email: "user@email.com",
      phone: "+91 5456457",
      status: "Sent",
      label: "label",
      compaignName: "Social media marketing",
      dMed: "type",
      emailed: "tiktok",
      dateEmailed: "12 Aug 2023",
      lastUpdate: "12 Aug, 2023",
    },
  ];

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Sent":
        return "#09B7FF1F";
      case "Hired":
        return "#02B74A2E";
      case "Not Started":
        return "#73707430";
      case "Shortlisted":
        return "#4254FF33";
      default:
        return "";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Sent":
        return "#09B7FF";
      case "Hired":
        return "#0F833D";
      case "Not Started":
        return "#737074";
      case "Shortlisted":
        return "#4254FF";
      default:
        return "";
    }
  };

  const columns = [
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Name</h1>,
      dataIndex: "name",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Influencer Type</h1>
      ),
      dataIndex: "influencerType",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Instagram Url</h1>
      ),
      dataIndex: "instaUrl",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        return <div className="px-4">{text}</div>;
      },
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Tiktok Url</h1>
      ),
      dataIndex: "tiktockUrl",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        return <div className="px-4">{text}</div>;
      },
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">YouTube Url</h1>
      ),
      dataIndex: "ytUrl",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        return <div className="px-4">{text}</div>;
      },
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Other</h1>,
      dataIndex: "other",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        return <div className="px-4">{text}</div>;
      },
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Email</h1>,
      dataIndex: "email",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        return <div className="px-4">{text}</div>;
      },
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Phone</h1>,
      dataIndex: "phone",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Status</h1>,
      dataIndex: "status",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
      render: (text) => {
        let bgColor, textColor;

        switch (text) {
          case "Sent":
            bgColor = "#09B7FF1F";
            textColor = "#09B7FF";
            break;
          case "Hired":
            bgColor = "#02B74A2E";
            textColor = "#0F833D";
            break;
          case "Not Started":
            bgColor = "#73707430";
            textColor = "#737074";
            break;
          case "Shortlisted":
            bgColor = "#4254FF33";
            textColor = "#4254FF";
            break;
          default:
            bgColor = "";
            textColor = "";
        }

        return (
          <span
            className="w-full"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              padding: "4px 8px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Label</h1>,
      dataIndex: "label",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Campaign Name</h1>
      ),
      dataIndex: "compaignName",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">DMed</h1>,
      dataIndex: "dMed",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: <h1 className="font-[700] text-[#737074] fontMonst">Emailed</h1>,
      dataIndex: "emailed",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Date Emailed</h1>
      ),
      dataIndex: "dateEmailed",
      render: (_, record) => moment(record?.dateEmailed).format("DD MMM YYYY"),
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: (
        <h1 className="font-[700] text-[#737074] fontMonst">Last Update</h1>
      ),
      render: (_, record) => moment(record?.updatedAt).format("DD MMM YYYY"),
      dataIndex: "lastUpdate",
      align: "center",
      className: "fontMonst",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const tableData = relationships?.map((record, index) => (
    <div key={record.id} className="mb-4">
      <Card className="shadow-sm" size="small">
        <div className="flex justify-between items-center">
          <span className="font-[600] text-[20px] ">{record?.name}</span>
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
        </div>
        <div className="flex flex-col my-4">
          <div className="flex justify-between flex-wrap  mb-2">
            <div>
              <strong>Influencer Type:</strong> {record?.influencerType}
            </div>
            <div>
              <strong>Insta Url:</strong> {record.instaUrl}
            </div>
          </div>
          <div className="flex flex-col flex-wrap mb-2">
            <div className="my-2">
              <strong>Tiktok Url:</strong> {record?.tiktockUrl}
            </div>
            <div>
              <strong>YouTube Url:</strong> {record?.ytUrl}
            </div>
          </div>
          <div className="flex justify-between flex-wrap mb-2">
            <div>
              <strong>Other:</strong> {record?.other}
            </div>
            <div>
              <strong>Email:</strong> {record?.email}
            </div>
          </div>
          <div className="flex justify-between flex-wrap mb-2">
            <div>
              <strong>Phone:</strong> {record?.phone}
            </div>
            <div className="">
              <strong>Label:</strong> {record?.label}
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div>
              <strong>Date Emailed:</strong>{" "}
              {moment(record?.dateEmailed).format("DD MMM YYYY")}
            </div>
            <div>
              <strong>Last Update:</strong>{" "}
              {moment(record?.updatedAt).format("DD MMM YYYY")}
            </div>
          </div>
          <div className="flex justify-between items-center my-3">
            <div>
              <strong>DMed:</strong> {record.dMed}
            </div>
            <div>
              <span
                className="font-[600] text-center"
                style={{
                  backgroundColor: getStatusBackgroundColor(record.status),
                  color: getStatusTextColor(record?.status),
                  padding: "4px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  fontSize: "16px",
                  width: "120px",
                }}
              >
                {record.status}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Relationships</title>
      </Head>
      <div className="h-full">
        <div className="bg-white h-full my-4 mx-2 rounded-md fontMonst py-5 px-5">
          <div className="flex w-full justify-center sm:justify-between items-center">
            <h1 className="font-[700] text-[24px]  text-center fontMonst hidden sm:inline">
              Relationships
            </h1>
            <div className="flex space-x-2 items-center">
              <input
                ref={fileInputRef}
                type="file"
                id="upload"
                hidden
                onChange={handleFileChange}
              />
              <button
                style={{
                  background:
                    "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
                  color: "white",
                  fontWeight: 400,
                }}
                className="py-3 px-3 rounded-md fontRob flex items-center"
                onClick={() => setEditModalVisible(true)}
              >
                <p className="ml-1">Add new</p>
              </button>
              <button
                style={{
                  background:
                    "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
                  color: "white",
                  fontWeight: 400,
                }}
                className="py-3 px-3 rounded-md fontRob flex items-center"
                onClick={() => handleButtonClick()}
              >
                <UploadOutlined />
                <p className="ml-1">Import csv file</p>
              </button>
            </div>
          </div>

          <div className="compaign my-4">
            <Table
              dataSource={
                relationships && relationships?.length > 0 ? relationships : []
              }
              columns={columns}
              loading={isLoading}
              pagination={false}
              scroll={{ x: true }}
              responsive={["xs"]}
              rowClassName={(record, index) =>
                (index + 1) % 2 === 1 ? "bg-[#AF1FFC17] " : ""
              }
              className="fontMonst hidden md:block"
            />
            <div className="flex flex-col md:hidden">
              {relationships && relationships?.length > 0 ? tableData : null}
              {/* <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={data.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                style={{ textAlign: "center", marginTop: "16px" }}
              /> */}
            </div>
          </div>
        </div>
        <DeleteRelationshipModal
          visible={deleteModalVisible}
          selectedRowData={selectedRowData}
          onConfirm={handleDelete}
          onCancel={hideDeleteModal}
        />
        <EditRelationshipModal
          visible={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          onSave={handleEditSave}
          initialValues={editFormData}
        />
      </div>
    </>
  );
}

export default Relationship;
