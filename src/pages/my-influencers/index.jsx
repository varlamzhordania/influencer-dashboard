import React, { useState } from "react";
import { Select, Input, Button, Table } from "antd";
import {
  DownOutlined, // Ant Design icon for dropdown arrow
  SearchOutlined, // Ant Design icon for search button
} from "@ant-design/icons";
const { Option } = Select;
import Link from "next/link";
import { FaTh, FaList } from "react-icons/fa";
import Head from "next/head";
import FeaturedCollection from "../../components/FeaturedCollection";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { IconContext } from "react-icons";
import influencersApi from "@/lib/influencers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import formatNumber from "@/utils/formatNumber";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/AuthContext";

function Index() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeButton, setActiveButton] = useState("Search by Profile");
  const [isGridView, setIsGridView] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState({});
  const [isAddedToFavorites, setIsAddedToFavorites] = useState({});
  const { user } = useAuth();
  const favouriteMutation = useMutation(
    ["favourites"],
    async (data) => {
      await influencersApi.favouriteInfluencer({ ...data, userId: user?.uid });
      // if (
      //   favourites?.find(
      //     (e) => e?.platform_username === collection?.platform_username
      //   )
      // ) {
      //   setFavouriteMessage("Removed from favourites!");
      // } else {
      //   setFavouriteMessage("Added to favourites!");
      // }
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["favourites"]);
      },
    }
  );
  const bookmarkMutation = useMutation(
    ["bookmarks"],
    async (data) => {
      await influencersApi.bookmarkInfluencer({ ...data, userId: user?.uid });
      // if (
      //   bookmarks?.find(
      //     (e) => e?.platform_username === collection?.platform_username
      //   )
      // ) {
      //   setBookmarkMessage("Removed from bookmarks!");
      // } else {
      //   setBookmarkMessage("Added to bookmarks!");
      // }
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["bookmarks"]);
      },
    }
  );
  const { data: favourites, isLoading: favouritesLoading } = useQuery(
    ["favourites"],
    async () => {
      const response = await influencersApi.getFavourites(user?.uid);
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: bookmarks, isLoading: bookmarksLoading } = useQuery(
    ["bookmarks"],
    async () => {
      const response = await influencersApi.getBookmarks(user?.uid);
      return response;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setIsAddedToFavorites((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setTimeout(() => {
      setIsAddedToFavorites((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 3000);
  };

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setIsAddedToBookmarks((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
    setTimeout(() => {
      setIsAddedToBookmarks((prevState) => ({
        ...prevState,
        [id]: false,
      }));
    }, 3000);
  };

  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  // Function to handle the first dropdown change
  const handleSocialMediaChange = (value) => {
    // Handle the selected social media option
    console.log("Selected Social Media:", value);
  };

  // Function to handle the second dropdown change (Followers)
  const handleFollowersChange = (value) => {
    // Handle the selected followers option
    console.log("Selected Followers:", value);
  };

  // Function to handle the search button click
  const handleSearch = () => {
    // Perform search operation here
    console.log("Search Button Clicked");
  };

  const collections = [
    {
      id: 1,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/img1.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
    {
      id: 2,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/1img2.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
    {
      id: 3,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/img3.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
    {
      id: 4,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/img4.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
    {
      id: 5,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/img5.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
    {
      id: 6,
      name: "Bessie Rechards",
      post: "Social Worker",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmodua.",
      img: "/images/img6.svg",
      tags: ["Social work", "Work", "Social"],
      socialMedia: [
        {
          name: "facebook",
          img: "/images/facebook.svg",
          count: "12.3K",
        },
        {
          name: "instagram",
          img: "/images/instaColored.svg",
          count: "12.3K",
        },
        {
          name: "twitter",
          img: "/images/twitterColored.svg",
          count: "12.3K",
        },
      ],
    },
  ];
  // const columns = [
  //   {
  //     title: "Image",
  //     dataIndex: "img",
  //     key: "img",
  //     align: "center",
  //     render: (img) => (
  //       <div className="relative rounded-full h-[50px] w-[50px]">
  //         <Image src={img} alt="Influencer image" fill objectFit="contain" />
  //       </div>
  //     ),
  //   },
  //   {
  //     title: <span className="fontMonst font-weight-500">Name</span>,
  //     dataIndex: "name",
  //     key: "name",
  //     align: "center",
  //     render: (text) => <span className="fontMonst font-[500]">{text}</span>,
  //   },
  //   {
  //     title: <span className="fontMonst">Type</span>,
  //     dataIndex: "post",
  //     key: "post",
  //     align: "center",
  //     render: (text) => {
  //       return <span className="fontMonst text-[#4254FF4F]">{text}</span>;
  //     },
  //   },
  //   {
  //     title: <span className="fontMonst">Facebook</span>,
  //     dataIndex: "socialMedia",
  //     key: "facebook",
  //     align: "center",
  //     render: (socialMedia) => (
  //       <span style={{ color: "#1198F6" }} className="font-[500] fontMonst">
  //         {socialMedia.find((media) => media.name === "facebook")?.count ||
  //           "N/A"}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: <span className="fontMonst">Instagram</span>,
  //     dataIndex: "socialMedia",
  //     key: "instagram",
  //     align: "center",
  //     render: (socialMedia) => (
  //       <span style={{ color: "#FF0D4B" }} className="font-[500] fontMonst">
  //         {socialMedia.find((media) => media.name === "instagram")?.count ||
  //           "N/A"}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: <span className="fontMonst">Twitter</span>,
  //     dataIndex: "socialMedia",
  //     key: "twitter",
  //     align: "center",
  //     render: (socialMedia) => (
  //       <span style={{ color: "#1DA1F2" }} className="font-[500] fontMonst">
  //         {socialMedia.find((media) => media.name === "twitter")?.count ||
  //           "N/A"}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: <span className="fontMonst">Tags</span>,
  //     dataIndex: "tags",
  //     key: "tags",
  //     align: "center",
  //     render: (tags) => (
  //       <div className="fontMonst flex space-x-3 flex-wrap">
  //         {tags.map((tag, index) => (
  //           <p
  //             key={index}
  //             className="bg-[#EBEDFF] font-[400] py-1 px-3 rounded-full"
  //           >
  //             {tag}
  //           </p>
  //         ))}
  //       </div>
  //     ),
  //   },
  //   {
  //     title: "Actions",
  //     key: "actions",
  //     align: "center",
  //     render: (_, record) => (
  //       <div className="flex items-start ">
  //         <button onClick={(e) => toggleSave(e, record.id)}>
  //           <svg width="2" height="2">
  //             <defs>
  //               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
  //                 <stop
  //                   offset="0%"
  //                   style={{ stopColor: "#FF5B84", stopOpacity: 1 }}
  //                 />
  //                 <stop
  //                   offset="100%"
  //                   style={{ stopColor: "#4254FF", stopOpacity: 1 }}
  //                 />
  //               </linearGradient>
  //             </defs>
  //           </svg>
  //           <IconContext.Provider
  //             value={{ attr: { fill: "url('#gradient')" } }}
  //           >
  //             {isAddedToBookmarks[record.id] ? (
  //               <FaBookmark size={20} />
  //             ) : (
  //               <BsBookmark size={20} color="#4254FF" />
  //             )}
  //           </IconContext.Provider>
  //         </button>
  //         <button
  //           onClick={(e) => toggleFavorite(e, record.id)}
  //           className="flex justify-center items-center ml-1"
  //         >
  //           {isAddedToFavorites[record.id] ? (
  //             <FavoriteIcon style={{ color: "#FF5B84" }} />
  //           ) : (
  //             <FavoriteBorderIcon style={{ color: "#FF5B84" }} />
  //           )}
  //         </button>
  //       </div>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "Creator",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <div className="flex space-x-2 items-center">
          <div className="relative rounded-full h-[60px] w-[60px]">
            <Image
              src={record?.image_url ? record?.image_url : ""}
              alt="Influencer image"
              fill={true}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{record?.full_name}</span>
            <div className="flex items-center space-x-1">
              <Link
                href={
                  record?.work_platform?.name === "Instagram"
                    ? `https://instagram.com/${record?.platform_username}`
                    : record?.work_platform?.name === "YouTube"
                    ? `https://youtube.com/@${record?.platform_username}`
                    : `https://tiktok.com/@${record?.platform_username}`
                }
                className="text-[#4254FF4F] flex items-center space-x-1 text-sm w-fit capitalize hover:border-b"
                target="_blank"
              >
                {record?.work_platform?.name === "Instagram" ? (
                  <AiOutlineInstagram color={"#4254FF4F"} />
                ) : record?.work_platform?.name === "YouTube" ? (
                  <AiOutlineYoutube color={"#4254FF4F"} />
                ) : (
                  <BiLogoTiktok color={"#4254FF4F"} />
                )}
                <span>@{record?.platform_username}</span>
                <FiExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: <span className="fontMonst font-weight-500">Followers</span>,
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <span className="fontMonst font-[500]">
          {record?.subscriber_count
            ? formatNumber(record?.subscriber_count)
            : formatNumber(record?.follower_count)}
        </span>
      ),
    },
    {
      title: <span className="fontMonst">Average likes</span>,
      dataIndex: "post",
      key: "post",
      render: (_, record) => {
        return (
          <span className="fontMonst">
            {record?.average_likes && record?.average_likes !== 0
              ? formatNumber(record?.average_likes)
              : "-"}
          </span>
        );
      },
    },
    {
      title: <span className="fontMonst">Engagement rate</span>,
      dataIndex: "post",
      key: "post",
      render: (_, record) => {
        return (
          <span className="fontMonst">
            {record?.engagement_rate && record?.engagement_rate !== 0
              ? `${Number(record?.engagement_rate).toFixed(2)}%`
              : "-"}
          </span>
        );
      },
    },
    {
      title: <span className="fontMonst">Follower growth</span>,
      dataIndex: "post",
      key: "post",
      render: (_, record) => {
        return (
          <span className="fontMonst">
            {record?.filter_match?.follower_growth &&
            record?.filter_match?.follower_growth !== 0
              ? `${record?.filter_match?.follower_growth?.value}%`
              : "-"}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex items-start ">
          <button onClick={(e) => bookmarkMutation.mutate(record)}>
            <svg width="2" height="2">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#FF5B84", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#4254FF", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
            </svg>
            <IconContext.Provider
              value={{ attr: { fill: "url('#gradient')" } }}
            >
              {bookmarks?.find(
                (e) => e?.platform_username === record?.platform_username
              ) ? (
                <FaBookmark size={20} />
              ) : (
                <BsBookmark size={20} color="#4254FF" />
              )}
            </IconContext.Provider>
          </button>
          <button
            onClick={(e) => favouriteMutation.mutate(record)}
            className="flex justify-center items-center ml-1"
          >
            {favourites?.find(
              (e) => e?.platform_username === record?.platform_username
            ) ? (
              <FavoriteIcon style={{ color: "#FF5B84" }} />
            ) : (
              <FavoriteBorderIcon style={{ color: "#FF5B84" }} />
            )}
          </button>
        </div>
      ),
    },
  ];
  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="h-full bg-[#FAF9FD] ">
      <Head>
        <title>My Influencers</title>
      </Head>
      <div className=" bg-[#FAF9FD]  my-4 mx-2  py-4  ">
        {isAddedToBookmarks.length && (
          <div className="added-to-bookmarks-message fontMonst">
            Added to bookmarks!
          </div>
        )}
        {isAddedToFavorites.length && (
          <div className="added-to-bookmarks-message fontMonst">
            Added to favorites!
          </div>
        )}

        <div className="my-4 ">
          <div className="flex justify-between mx-3">
            <h1 className="font-[700] text-[24px] fontMonst  xxl:mx-[3rem]">
              Favourites
            </h1>
            <button
              onClick={toggleViewMode}
              className="flex mt-2 md:flex-row items-center"
            >
              {isGridView ? (
                <>
                  <FaList
                    className="mr-1"
                    style={{ color: "#FF5B84", fontSize: "21px" }}
                  />
                </>
              ) : (
                <>
                  <FaTh
                    className="mr-1"
                    style={{ color: "#FF5B84", fontSize: "21px" }}
                  />
                </>
              )}
            </button>
          </div>
          {favouritesLoading || bookmarksLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col">
              {bookmarks?.length > 0 ? (
                isGridView ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bookmarks.map((collection, index) => (
                      <FeaturedCollection
                        key={index}
                        collection={collection}
                        favourites={favourites}
                        bookmarks={bookmarks}
                      />
                    ))}
                  </div>
                ) : (
                  <Table
                    className="w-full"
                    rowClassName="cursor-pointer hover:bg-gray"
                    columns={columns}
                    dataSource={bookmarks}
                    scroll={{ x: 1000 }}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          router.push(
                            `/influencer-details?identifier=${record.platform_username}&work_platform_id=${record?.work_platform?.id}`
                          );
                        },
                      };
                    }}
                  />
                )
              ) : (
                <div className="w-full h-28 flex items-center justify-center">
                  <span className="text-2xl font-semibold italic opacity-25">
                    No favourites found
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
