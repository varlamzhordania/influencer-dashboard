import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import formatNumber from "@/utils/formatNumber";
import { BiUser } from "react-icons/bi";
import { AiFillHeart, AiOutlineUser } from "react-icons/ai";
import { FaComments, FaUsers } from "react-icons/fa";
function Performance({ data, graphsData }) {
  const [showEyeOpen, setShowEyeOpen] = useState(true);

  const toggleEyeIcon = () => {
    setShowEyeOpen((prevShowEyeOpen) => !prevShowEyeOpen);
  };

  const iconStyle = {
    color: "#4254FF",
  };

  // Data for your line graphs
  const followerCountGraph = {
    labels: graphsData?.month,
    datasets: [
      {
        label: data?.profile?.follower_count ? "Followers" : "Subscribers",
        data: data?.profile?.follower_count
          ? graphsData?.follower_count
          : graphsData?.subscriber_count,
        borderColor: "#4254FF",
        backgroundColor: "transparent",
        tension: 0.4, // Adjust the line curve
      },
    ],
  };

  const avgLikesGraph = {
    labels: graphsData?.month,
    datasets: [
      {
        label: "Likes",
        data: graphsData?.average_likes,
        borderColor: "#4254FF",
        backgroundColor: "transparent",
        tension: 0.4, // Adjust the line curve
      },
    ],
  };

  const engagementRateData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Engagement Rate",
        data: [25, 30, 35, 40, 45, 50, 30, 40, 20],
        borderColor: "#FF5B84",
        backgroundColor: "transparent",
        tension: 0.4, // Adjust the line curve
      },
    ],
  };

  const partnershipsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Partnerships",
        data: [10, 15, 20, 25, 30, 35, 20, 15, 10],
        borderColor: "#FF5B84",
        backgroundColor: "transparent",
        tension: 0.4, // Adjust the line curve
      },
    ],
  };

  const totalViewsOptions = {
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  const engagementRateOptions = {
    scales: {
      x: {
        display: false, // Hide x-axis
      },
      y: {
        display: false, // Hide y-axis
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className="fontMonst py-4 w-full">
      <h1 className="font-[700] text-[18px] fontMonst">Performance</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* First Grid Item */}
        <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Followers</p>
              <p className="text-[#737074]">
                {data?.profile?.follower_count
                  ? formatNumber(data?.profile?.follower_count)
                  : formatNumber(data?.profile?.subscriber_count)}
              </p>
            </div>
            <div>
              <button
                className="bg-[#4254FF21]  py-2 px-3 rounded-md"
                onClick={toggleEyeIcon}
              >
                {/* {showEyeOpen ? ( */}
                <FaUsers style={iconStyle} />
                {/* ) : (
                  <EyeInvisibleOutlined style={iconStyle} />
                )} */}
              </button>
            </div>
          </div>
          <div className=" h-[50px]">
            <Line data={followerCountGraph} options={totalViewsOptions} />
          </div>
        </div>

      

        {/* Third Grid Item */}
        <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Avg Likes Per Post</p>
              <p className="text-[#737074]">
                {data?.profile?.average_likes
                  ? formatNumber(data?.profile?.average_likes)
                  : "-"}
              </p>
            </div>
            <div className="ml-3">
              <button className="bg-[#4254FF21] py-2 px-3 rounded-md">
                {/* <Image src="/images/partner.svg" width={12} height={12} /> */}
                <AiFillHeart style={iconStyle} />
              </button>
            </div>
          </div>
          <div className=" h-[50px]">
            <Line data={avgLikesGraph} options={engagementRateOptions} />
          </div>
        </div>

          {/* Second Grid Item */}
          <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Engagement Rate</p>
              <p className="text-[#737074]">
                {data?.profile?.engagement_rate
                  ? `${data?.profile?.engagement_rate}%`
                  : "-"}
              </p>
            </div>
            <div className="ml-3">
              <button className="bg-[#4254FF21] py-2 px-3 rounded-md">
                {/* <Image src="/images/rate.svg" width={12} height={12} /> */}
                <FaComments style={iconStyle} />
              </button>
            </div>
          </div>
          {/* <div className=" h-[50px]">
            <Line data={engagementRateData} options={engagementRateOptions} />
          </div> */}
        </div>

        {/* Fourth Grid Item */}
        <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Avg Comments Per Post</p>
              <p className="text-[#737074]">
                {data?.profile?.average_comments
                  ? formatNumber(data?.profile?.average_comments)
                  : "-"}
              </p>
            </div>
            <div className="ml-3">
              <button
                className="bg-[#4254FF21] py-2 px-3 rounded-md"
                onClick={toggleEyeIcon}
              >
                {/* {showEyeOpen ? ( */}
                <FaComments style={iconStyle} />
                {/* ) : ( */}
                {/* <EyeInvisibleOutlined style={iconStyle} />
                )} */}
              </button>
            </div>
          </div>
          {/* <div className=" h-[50px]">
            <Line data={totalViewsData} options={totalViewsOptions} />
          </div> */}
        </div>
        <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Avg Views Per Video</p>
              <p className="text-[#737074]">
                {data?.profile?.average_views &&
                data?.profile?.average_views !== 0
                  ? formatNumber(data?.profile?.average_views)
                  : "-"}
              </p>
            </div>
            <div className="ml-3">
              <button
                className="bg-[#4254FF21] py-1 px-3 rounded-md"
                onClick={toggleEyeIcon}
              >
                {/* {showEyeOpen ? ( */}
                <EyeOutlined style={iconStyle} />
                {/* ) : (
                  <EyeInvisibleOutlined style={iconStyle} />
                )} */}
              </button>
            </div>
          </div>
          {/* <div className=" h-[50px]">
            <Line data={totalViewsData} options={totalViewsOptions} />
          </div> */}
        </div>
        <div className="rounded-md shadowDiv py-4 px-5 overflow-hidden ">
          <div className="flex justify-between">
            <div>
              <p className="font-[700]">Avg View Per Reel</p>
              <p className="text-[#737074]">
                {data?.profile?.average_reels_views &&
                data?.profile?.average_reels_views !== 0
                  ? formatNumber(data?.profile?.average_reels_views)
                  : "-"}
              </p>
            </div>
            <div className="ml-3">
              <button
                className="bg-[#4254FF21] py-1 px-3 rounded-md"
                onClick={toggleEyeIcon}
              >
                {/* {showEyeOpen ? ( */}
                <EyeOutlined style={iconStyle} />
                {/* ) : (
                  <EyeInvisibleOutlined style={iconStyle} />
                )} */}
              </button>
            </div>
          </div>
          {/* <div className=" h-[50px]">
            <Line data={totalViewsData} options={totalViewsOptions} />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Performance;
