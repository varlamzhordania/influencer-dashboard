import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  Input,
  Button,
  Table,
  Slider,
  Pagination,
  Tooltip,
  Avatar,
} from "antd";
import {
  DownOutlined, // Ant Design icon for dropdown arrow
  SearchOutlined, // Ant Design icon for search button
} from "@ant-design/icons";
const { Option } = Select;
import Link from "next/link";
import { FaTh, FaList } from "react-icons/fa";
import Head from "next/head";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { IconContext } from "react-icons";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import influencersApi from "@/lib/influencers";
import { RiArrowDropDownLine } from "react-icons/ri";
import LocationItem from "@/components/LocationItem";
import SearchCard from "@/components/SearchCard";
import Loader from "@/components/Loader";
import FeaturedCollection from "@/components/FeaturedCollection";
import FiltersMenu from "@/components/FiltersMenu";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import UnlockAccessModal from "@/components/UnlockAccessModal";
import FiltersBox from "@/components/FiltersBox";

const fetchInfluencers = async (selectedWorkPlatform, filters, offset) => {
  const response = await axios.post("/api/influencers", {
    work_platform_id: selectedWorkPlatform
      ? selectedWorkPlatform
      : "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
    offset,
    ...filters,
  });
  return response.data;
};
const fetchInfluencersByKeyword = async (
  selectedWorkPlatform,
  keywords,
  offset
) => {
  const response = await axios.post("/api/influencers/by_keyword", {
    work_platform_id: selectedWorkPlatform
      ? selectedWorkPlatform
      : "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
    offset,
    description_keywords: keywords,
  });
  return response.data;
};

function Index() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeButton, setActiveButton] = useState("Search by Filter");
  const [isGridView, setIsGridView] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [filtersMenu, setFiltersMenu] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [offset, setOffset] = useState(0);
  const [dateRange, setDateRange] = useState(false);
  const [followersRange, setFollowersRange] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [location, setLocation] = useState(false);
  const [genderSelection, setGenderSelection] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [filters, setFilters] = useState();
  const [selectedWorkPlatform, setSelectedWorkPlatform] = useState(
    "9bb8913b-ddd9-430b-a66a-d74d846e6c66"
  );
  const [searchData, setSearchData] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState({});
  const [isAddedToFavorites, setIsAddedToFavorites] = useState({});
  const [topicSearchInput, setTopicSearchInput] = useState("");
  const [topics, setTopics] = useState([]);
  const queryClient = useQueryClient();
  const ref = useRef(null);
  // Th // State to store the API data

  // const handleClickOutside = (e) => {
  //   if (!ref?.current?.contains(e?.target)) {
  //     setGenderSelection(false);
  //     setFollowersRange(false);
  //     setLocation(false);
  //     setDateRange(false);
  //   }
  // };

  function formatNumber(number) {
    // Check if the number is greater than or equal to 1 million
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number.toString();
    }
  }

  const rowClassName = (record, index) => {
    if (user?.trialVersion && !user?.admin) {
      if (index < 7) {
        return "cursor-pointer"; // Apply a class to the first 5 rows
      } else {
        return "hidden-row pointer-events-none"; // Apply a class to hide the rest of the rows
      }
    } else {
      return "cursor-pointer";
    }
  };

  const [searchedLocations, setSearchedLocations] = useState([]);
  const [searching, setSearching] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  useEffect(() => {
    if (debouncedSearchText !== "") {
      // Use a debounce to make API requests only after a brief pause in typing
      const delay = setTimeout(() => {
        handleSearchLocations(debouncedSearchText);
      }, 300); // Adjust the delay time as needed
      return () => clearTimeout(delay);
    } else {
      setSearchedLocations([]);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    if (topicSearchInput !== "") {
      // Use a debounce to make API requests only after a brief pause in typing
      const delay = setTimeout(() => {
        handleSearchTopics(topicSearchInput);
      }, 300); // Adjust the delay time as needed
      return () => clearTimeout(delay);
    } else {
      setTopics([]);
    }
  }, [topicSearchInput]);

  const handleSearchLocations = async (value) => {
    setSearching(true);

    const response = await axios.post("/api/influencers/locations/search", {
      work_platform_id: selectedWorkPlatform,
      queryText: value,
    });
    setSearchedLocations(response.data?.data);
    setSearching(false);
  };

  const handleSearchTopics = async (value) => {
    setSearching(true);
    const response = await axios.post("/api/influencers/topics", {
      work_platform_id: selectedWorkPlatform,
      queryText: value,
    });
    setTopics(response.data?.data);
    setSearching(false);
  };

  const handleInputChange = (value) => {
    setDebouncedSearchText(value);
  };

  const handleTopicInputChange = (value) => {
    setTopicSearchInput(value);
    // await handleSearchTopics(value);
  };

  // const { data, isLoading } = useQuery(
  //   ["influencers", selectedWorkPlatform],
  //   async () => {
  //     const response = await axios.post("/api/influencers", {
  //       work_platform_id: selectedWorkPlatform
  //         ? selectedWorkPlatform
  //         : "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
  //       ...filters,
  //     });
  //     return response.data;
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  // useEffect(() => {
  //   document?.addEventListener("click", handleClickOutside, true);
  // }, []);

  const { mutate, isLoading: applyingFiltersLoading } = useMutation(
    (data) =>
      fetchInfluencers(data?.selectedWorkPlatform, data?.filters, offset),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["influencers", selectedWorkPlatform, offset],
          data
        );
      },
    }
  );

  const {
    mutate: searchByKeywordMutation,
    isLoading: searchingByKeywordLoading,
  } = useMutation(
    (data) => fetchInfluencersByKeyword(selectedWorkPlatform, keywords, offset),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ["influencers", selectedWorkPlatform, offset],
          data
        );
      },
    }
  );

  const { data, isLoading } = useQuery(
    ["influencers", selectedWorkPlatform, offset],
    () => fetchInfluencers(selectedWorkPlatform, filters, offset),
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: locations, isLoading: locationsLoading } = useQuery(
    ["locations"],
    async () => {
      const response = await axios.get("/api/influencers/locations");
      return response.data?.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: brands, isLoading: brandsLoading } = useQuery(
    ["brands"],
    async () => {
      const response = await axios.get("/api/influencers/brand_affinities");
      return response.data?.brands;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: languages, isLoading: languagesLoading } = useQuery(
    ["languages"],
    async () => {
      const response = await axios.get("/api/influencers/languages");
      return response.data?.languages;
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: interests, isLoading: interestsLoading } = useQuery(
    ["interests"],
    async () => {
      const response = await axios.get("/api/influencers/interests");
      return response.data?.interests;
    },
    {
      refetchOnWindowFocus: false,
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
      enabled: !!user,
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
      enabled: !!user,
    }
  );
  const { data: workPlatforms, isLoading: workPlatformsLoading } = useQuery(
    ["work_platforms"],
    async () => {
      const response = await axios.get("/api/work_platforms");
      const filteredPlatforms = response.data?.data?.filter(
        (e) =>
          e?.name === "Instagram" ||
          // e?.name === "Facebook" ||
          // e?.name === "Twitter" ||
          e?.name === "YouTube" ||
          e?.name === "TikTok"
      );
      return filteredPlatforms;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

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
    setSelectedWorkPlatform(value);
  };

  const searchResults = async () => {
    setSearchLoading(true);
    const response = await axios.post("/api/influencers/search", {
      work_platform_id: selectedWorkPlatform
        ? selectedWorkPlatform
        : "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
      queryText,
    });
    setSearchData(response.data?.data);
    setSearchLoading(false);
    return response.data;
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

  const columns = [
    {
      title: "Creator",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <div className="flex space-x-2 items-center">
          {/* <div className="relative rounded-full h-[60px] w-[60px]"> */}
          <Avatar
            src={record?.image_url ? record?.image_url : ""}
            alt="profile picture"
            size={90}
          />
          {/* </div> */}
          <div className="flex flex-col">
            <div className="flex space-x-1">
              <span className="font-semibold text-lg">{record?.full_name}</span>
              {record?.is_verified ? (
                <Image
                  alt="verify"
                  src="/images/verify.svg"
                  width={24}
                  height={24}
                />
              ) : null}
            </div>
            <div className="flex items-center space-x-1">
              <Link
                href={
                  record?.work_platform?.name === "Instagram"
                    ? `https://instagram.com/${record?.platform_username}`
                    : record?.work_platform?.name === "YouTube"
                    ? `https://youtube.com/@${record?.platform_username}`
                    : `https://tiktok.com/@${record?.platform_username}`
                }
                className="text-black opacity-50 flex items-center space-x-1 text-sm w-fit capitalize hover:border-b hover:text-black"
                target="_blank"
              >
                {record?.work_platform?.name === "Instagram" ? (
                  <AiOutlineInstagram color={"black"} opacity={50} size={20} />
                ) : record?.work_platform?.name === "YouTube" ? (
                  <AiOutlineYoutube color={"black"} opacity={50} size={20} />
                ) : (
                  <BiLogoTiktok color={"black"} opacity={50} size={20} />
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
      sorter: (a, b) =>
        a?.subscriber_count
          ? a?.subscriber_count - b?.subscriber_count
          : a?.follower_count - b?.follower_count,
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
      sorter: (a, b) => a?.average_likes - b?.average_likes,
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
      sorter: (a, b) => a?.engagement_rate - b?.engagement_rate,
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className="flex items-start">
          <Tooltip title="Bookmark">
            <button
              onClick={(e) => bookmarkMutation.mutate(record)}
              className="z-50"
            >
              <svg width="2" height="2">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
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
          </Tooltip>
          <Tooltip title="Favourite">
            <button
              onClick={(e) => favouriteMutation.mutate(record)}
              className="flex justify-center items-center ml-1 z-50"
            >
              {favourites?.find(
                (e) => e?.platform_username === record?.platform_username
              ) ? (
                <FavoriteIcon style={{ color: "#FF5B84" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "#FF5B84" }} />
              )}
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const applyFilters = () => {
    // Trigger the query with the selectedWorkPlatform and filters
    mutate({ selectedWorkPlatform, filters });
  };

  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };

  const handlePageChange = (page) => {
    const newOffset = (page - 1) * 50; //50 is page size;
    // useApiData(offset, pageSize);
    setOffset(newOffset);
  };

  if (
    workPlatformsLoading ||
    locationsLoading ||
    brandsLoading ||
    interestsLoading ||
    bookmarksLoading ||
    languagesLoading
  ) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-[#FAF9FD] ">
      <Head>
        <title>Creator Discovery</title>
      </Head>
      <div className="bg-[#FAF9FD] my-4 mx-2 py-4">
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

        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row fontRob md:space-x-3 md:justify-between md:items-center bg-white rounded-md p-2 w-full">
          <div className="flex items-start justify-center sm:justify-start w-fit sm:w-auto py-2 px-2 fontRob bg-[#AF1FFC24] rounded-md ">
            <button
              className={`py-2 px-2  ${
                activeButton === "Search by Filter"
                  ? "gradient-bg rounded-md"
                  : ""
              }`}
              onClick={() => handleButtonClick("Search by Filter")}
            >
              Search by Filter
            </button>
            {/* <button
              className={`py-2 px-2 ${
                activeButton === "Search by Profile"
                  ? "gradient-bg rounded-md"
                  : ""
              }`}
              onClick={() => handleButtonClick("Search by Profile")}
            >
              Search by Profile
            </button>
            <button
              className={`py-2 px-2  ${
                activeButton === "Marketplace" ? "gradient-bg rounded-md" : ""
              }`}
              onClick={() => handleButtonClick("Marketplace")}
            >
              Marketplace
            </button> */}
          </div>

          {activeButton === "Search by Filter" ||
          activeButton === "Marketplace" ? (
            // <>
            //   <div className="flex items-center space-x-3 border w-[80%]">
            //     {/* <div className="flex items-center space-x-2"> */}
            //     <Select
            //       className={`social rounded-md xl:w-[90%] custom-select`}
            //       // style={{
            //       //   width: "50rem",
            //       // }}
            //       onChange={handleSocialMediaChange}
            //       suffixIcon={
            //         <Image
            //           alt=""
            //           src="/images/dropdown.svg"
            //           width={8}
            //           height={8}
            //         />
            //       }
            //       dropdownClassName="dropdown-style"
            //       placeholder={
            //         <div className="flex space-x-1 items-center">
            //           <Image
            //             src={"/images/instaColored.svg"}
            //             width={20}
            //             alt=""
            //             height={20}
            //           />
            //           <span>Instagram</span>
            //         </div>
            //       }
            //     >
            //       {workPlatforms?.map((workPlatform) => (
            //         <Option
            //           value={workPlatform?.id}
            //           className="flex justify-center relative p-5"
            //         >
            //           <div className="flex space-x-1 items-center">
            //             <Image
            //               alt=""
            //               src={workPlatform?.logo_url}
            //               width={20}
            //               height={20}
            //             />
            //             <span>{workPlatform?.name}</span>
            //           </div>
            //         </Option>
            //       ))}
            //     </Select>
            //     <div className="relative flex items-center">
            //       <div
            //         className="border border-gray rounded-md p-1 flex items-center justify-between space-x-4 bg-white px-2 w-fit"
            //         onClick={() => {
            //           setDateRange(false);
            //           setGenderSelection(false);
            //           setLocation(false);
            //           setFollowersRange(!followersRange);
            //         }}
            //       >
            //         <span className="opacity-30 font-light">Followers</span>
            //         <Image
            //           alt=""
            //           src="/images/dropdown.svg"
            //           width={8}
            //           height={8}
            //         />
            //         {/* <RiArrowDropDownLine /> */}
            //       </div>
            //       {followersRange && (
            //         <div className="bg-white p-2 grid grid-cols-2 space-x-2 absolute top-12 z-50 shadow-lg w-52">
            //           <Select
            //             placeholder="From"
            //             suffixIcon={
            //               <Image
            //                 src="/images/dropdown.svg"
            //                 width={8}
            //                 alt=""
            //                 height={8}
            //               />
            //             }
            //             options={[
            //               { label: "1k", value: 1000 },
            //               { label: "5k", value: 5000 },
            //               { label: "10k", value: 10000 },
            //               { label: "25k", value: 25000 },
            //               { label: "50k", value: 50000 },
            //               { label: "100k", value: 100000 },
            //               { label: "250k", value: 250000 },
            //               { label: "500k", value: 500000 },
            //             ]}
            //             value={
            //               filters?.follower_count
            //                 ? filters?.follower_count?.min
            //                 : filters?.subscriber_count?.min
            //             }
            //             onChange={(e) => {
            //               setFilters({
            //                 ...filters,
            //                 follower_count: {
            //                   ...filters.follower_count,
            //                   min: e,
            //                 },
            //                 subscriber_count: {
            //                   ...filters.subscriber_count,
            //                   min: e,
            //                 },
            //               });
            //             }}
            //           />
            //           <Select
            //             placeholder="To"
            //             options={[
            //               { label: "1k", value: 1000 },
            //               { label: "5k", value: 5000 },
            //               { label: "10k", value: 10000 },
            //               { label: "25k", value: 25000 },
            //               { label: "50k", value: 50000 },
            //               { label: "100k", value: 100000 },
            //               { label: "250k", value: 250000 },
            //               { label: "500k", value: 500000 },
            //             ]}
            //             value={
            //               filters?.follower_count
            //                 ? filters?.follower_count?.max
            //                 : filters?.subscriber_count?.max
            //             }
            //             suffixIcon={
            //               <Image
            //                 alt=""
            //                 src="/images/dropdown.svg"
            //                 width={8}
            //                 height={8}
            //               />
            //             }
            //             onChange={(e) => {
            //               setFilters({
            //                 ...filters,
            //                 follower_count: {
            //                   ...filters.follower_count,
            //                   max: e,
            //                 },
            //                 subscriber_count: {
            //                   ...filters.subscriber_count,
            //                   max: e,
            //                 },
            //               });
            //             }}
            //           />
            //         </div>
            //       )}
            //     </div>
            //     {/* </div> */}
            //     <Input
            //       className="py-2 px-2 fontRob"
            //       placeholder="Enter a keyword"
            //       prefix={<SearchOutlined />}
            //       onChange={(e) => setKeywords(e.target.value)}
            //     />
            //     <button
            //       className="gradient-bg py-2 px-2 rounded-md"
            //       onClick={() => searchByKeywordMutation()}
            //     >
            //       Get Result
            //     </button>
            //   </div>
            // </>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 w-full md:w-[70%]">
              <Select
                size="large"
                onChange={handleSocialMediaChange}
                placeholder={
                  <div className="flex space-x-1 items-center pr-3">
                    <Image
                      src={"/images/instaColored.svg"}
                      width={20}
                      alt=""
                      height={20}
                    />
                    <span>Instagram</span>
                  </div>
                }
                style={{ width: "20rem" }}
              >
                {workPlatforms?.map((workPlatform) => (
                  <Option
                    value={workPlatform?.id}
                    className="flex justify-center relative p-5"
                  >
                    <div className="flex space-x-1 items-center">
                      <Image
                        alt=""
                        src={workPlatform?.logo_url}
                        width={20}
                        height={20}
                      />
                      <span>{workPlatform?.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
              <div className="relative hidden md:flex md:items-center">
                <div
                  className="border border-gray rounded-md p-2 flex items-center justify-between space-x-4 bg-white px-5 w-fit"
                  onClick={() => {
                    setDateRange(false);
                    setGenderSelection(false);
                    setLocation(false);
                    setFollowersRange(!followersRange);
                  }}
                >
                  <span className="opacity-30 font-light">Followers</span>
                  <Image
                    alt=""
                    src="/images/dropdown.svg"
                    width={8}
                    height={8}
                  />
                  {/* <RiArrowDropDownLine /> */}
                </div>
                {followersRange && (
                  <div className="bg-white p-2 grid grid-cols-2 space-x-2 absolute top-12 z-50 shadow-lg w-52">
                    <Select
                      placeholder="From"
                      // suffixIcon={
                      //   <Image
                      //     src="/images/dropdown.svg"
                      //     width={8}
                      //     alt=""
                      //     height={8}
                      //   />
                      // }
                      options={[
                        { label: "1k", value: 1000 },
                        { label: "5k", value: 5000 },
                        { label: "10k", value: 10000 },
                        { label: "25k", value: 25000 },
                        { label: "50k", value: 50000 },
                        { label: "100k", value: 100000 },
                        { label: "250k", value: 250000 },
                        { label: "500k", value: 500000 },
                      ]}
                      value={
                        filters?.follower_count
                          ? filters?.follower_count?.min
                          : filters?.subscriber_count?.min
                      }
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          follower_count: {
                            ...filters.follower_count,
                            min: e,
                          },
                          subscriber_count: {
                            ...filters.subscriber_count,
                            min: e,
                          },
                        });
                      }}
                    />
                    <Select
                      placeholder="To"
                      options={[
                        { label: "1k", value: 1000 },
                        { label: "5k", value: 5000 },
                        { label: "10k", value: 10000 },
                        { label: "25k", value: 25000 },
                        { label: "50k", value: 50000 },
                        { label: "100k", value: 100000 },
                        { label: "250k", value: 250000 },
                        { label: "500k", value: 500000 },
                      ]}
                      value={
                        filters?.follower_count
                          ? filters?.follower_count?.max
                          : filters?.subscriber_count?.max
                      }
                      // suffixIcon={
                      //   <Image
                      //     alt=""
                      //     src="/images/dropdown.svg"
                      //     width={8}
                      //     height={8}
                      //   />
                      // }
                      onChange={(e) => {
                        setFilters({
                          ...filters,
                          follower_count: {
                            ...filters.follower_count,
                            max: e,
                          },
                          subscriber_count: {
                            ...filters.subscriber_count,
                            max: e,
                          },
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <Select
                mode="multiple"
                filterOption={false}
                onSearch={handleTopicInputChange}
                value={filters?.topic_relevance?.name}
                options={topics?.map((e) => {
                  return {
                    label: e?.name,
                    value: e?.value,
                  };
                })}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    topic_relevance: {
                      name: e,
                    },
                  });
                }}
                prefix={<SearchOutlined />}
                placeholder="Search topic i.e baking"
                style={{ width: "20rem" }}
                showSearch
                loading={searching}
                size="middle"
                className="py-3"
                rootClassName="py-3"
                popupClassName="py-3"
              />
              <Button
                className="border rounded-md gradient-bg hover:text-white w-fit md:w-auto"
                onClick={() => applyFilters()}
                size="large"
              >
                Get Result
              </Button>
            </div>
          ) : null}
        </div>
        {activeButton === "Search by Filter" ||
        activeButton === "Marketplace" ? (
          //Primary filters
          <div className="flex items-center justify-between mt-5 w-full sm:w-auto rounded-md p-2 pr-4 bg-white shadow-md">
            <div className="relative flex sm:hidden items-center">
              <div
                className="rounded-md p-1 flex items-center justify-between space-x-4 px-2 cursor-pointer"
                onClick={() => {
                  setFollowersRange(false);
                  setDateRange(false);
                  setGenderSelection(false);
                  setLocation(!location);
                }}
              >
                <span className="opacity-30 font-light">Audience location</span>
                <Image alt="" src="/images/dropdown.svg" width={8} height={8} />
              </div>
              {location && (
                <div className="bg-white p-2 grid grid-cols-1 space-y-2 absolute top-[4.5rem] shadow-lg w-72 z-50">
                  <Select
                    // mode="multiple"
                    className="py-3 px-2 filter rounded-md w-full"
                    placeholder="Search..."
                    loading={searching}
                    showSearch
                    filterOption={false}
                    onSearch={handleInputChange}
                    // value={filters?.audience_locations?.map(
                    //   (e) => e?.location_id
                    // )}
                    style={{
                      width: "100%",
                    }}
                    dropdownClassName="dropdown-style"
                    onChange={(e) => {
                      // let loc = [];
                      const newLocations = filters?.audience_locations
                        ? filters?.audience_locations
                        : [];
                      newLocations?.push({
                        location_id: e,
                        percentage_value: 20,
                        operator: "GT",
                        name: searchedLocations?.find((loc) => loc?.id === e)
                          ?.display_name,
                      });
                      // e?.forEach((a) => {
                      //   loc.push({
                      //     location_id: a,
                      //     percentage_value: 20,
                      //     operator: "GT",
                      //     name: searchedLocations?.find((e) => e?.id === a)
                      //       ?.display_name,
                      //   });
                      // });
                      setFilters({
                        ...filters,
                        audience_locations: newLocations,
                      });
                    }}
                    options={searchedLocations?.map((e) => {
                      return {
                        value: e?.id,
                        label: e?.display_name,
                      };
                    })}
                  />
                  {filters?.audience_locations &&
                  filters?.audience_locations?.length > 0 ? (
                    <div className="flex flex-col space-y-2">
                      {filters?.audience_locations?.map((loc, i) => {
                        // const foundLocation = locations?.find(
                        //   (e) => e?.id === loc?.location_id
                        // );
                        return (
                          <LocationItem
                            key={i}
                            percent={loc?.percentage_value}
                            location={loc?.name}
                            setFilters={setFilters}
                            filters={filters}
                            data={loc}
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            <div className="hidden sm:flex w-full sm:w-auto flex-col sm:flex-row sm:space-x-2 fontRob">
              <div className="relative flex items-center">
                <div
                  className="rounded-md p-1 flex items-center justify-between space-x-4 px-2 cursor-pointer"
                  onClick={() => {
                    setFollowersRange(false);
                    setDateRange(false);
                    setGenderSelection(false);
                    setLocation(!location);
                  }}
                >
                  <span className="opacity-30 font-light">
                    Audience location
                  </span>
                  <Image
                    alt=""
                    src="/images/dropdown.svg"
                    width={8}
                    height={8}
                  />
                </div>
                {location && (
                  <div className="bg-white p-2 grid grid-cols-1 space-y-2 absolute top-[4.5rem] shadow-lg w-72 z-50">
                    <Select
                      // mode="multiple"
                      className="py-3 px-2 filter rounded-md w-full"
                      placeholder="Search..."
                      loading={searching}
                      showSearch
                      filterOption={false}
                      onSearch={handleInputChange}
                      // value={filters?.audience_locations?.map(
                      //   (e) => e?.location_id
                      // )}
                      style={{
                        width: "100%",
                      }}
                      dropdownClassName="dropdown-style"
                      onChange={(e) => {
                        // let loc = [];
                        const newLocations = filters?.audience_locations
                          ? filters?.audience_locations
                          : [];
                        newLocations?.push({
                          location_id: e,
                          percentage_value: 20,
                          operator: "GT",
                          name: searchedLocations?.find((loc) => loc?.id === e)
                            ?.display_name,
                        });
                        // e?.forEach((a) => {
                        //   loc.push({
                        //     location_id: a,
                        //     percentage_value: 20,
                        //     operator: "GT",
                        //     name: searchedLocations?.find((e) => e?.id === a)
                        //       ?.display_name,
                        //   });
                        // });
                        setFilters({
                          ...filters,
                          audience_locations: newLocations,
                        });
                      }}
                      options={searchedLocations?.map((e) => {
                        return {
                          value: e?.id,
                          label: e?.display_name,
                        };
                      })}
                    />
                    {filters?.audience_locations &&
                    filters?.audience_locations?.length > 0 ? (
                      <div className="flex flex-col space-y-2">
                        {filters?.audience_locations?.map((loc, i) => {
                          // const foundLocation = locations?.find(
                          //   (e) => e?.id === loc?.location_id
                          // );
                          return (
                            <LocationItem
                              key={i}
                              percent={loc?.percentage_value}
                              location={loc?.name}
                              setFilters={setFilters}
                              filters={filters}
                              data={loc}
                            />
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              <div className="h-auto w-[.05rem] bg-opacity-10 bg-black"></div>
              <div className="relative flex items-center cursor-pointer">
                <div
                  className="rounded-md p-1 flex items-center justify-between space-x-4 px-2"
                  onClick={() => {
                    setFollowersRange(false);
                    setLocation(false);
                    setGenderSelection(false);
                    setDateRange(!dateRange);
                  }}
                >
                  <span className="opacity-30 font-light">Audience age</span>
                  <Image
                    alt=""
                    src="/images/dropdown.svg"
                    width={8}
                    height={8}
                  />
                </div>
                {dateRange && (
                  <div className="bg-white p-2 flex flex-col space-y-2 absolute top-[4.5rem] shadow-lg w-72 z-50">
                    <div className="grid grid-cols-2 space-x-2">
                      <Select
                        placeholder="From"
                        options={[
                          { label: "13", value: 13 },
                          { label: "18", value: 18 },
                          { label: "25", value: 25 },
                          { label: "35", value: 35 },
                          { label: "45", value: 45 },
                          { label: "65", value: 65 },
                        ]}
                        suffixIcon={
                          <Image
                            alt=""
                            src="/images/dropdown.svg"
                            width={8}
                            height={8}
                          />
                        }
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            audience_age: {
                              ...filters.audience_age,
                              min: e,
                            },
                          });
                        }}
                      />
                      <Select
                        placeholder="To"
                        options={[
                          { label: "17", value: 17 },
                          { label: "24", value: 24 },
                          { label: "34", value: 34 },
                          { label: "44", value: 44 },
                          { label: "64", value: 64 },
                        ]}
                        suffixIcon={
                          <Image
                            alt=""
                            src="/images/dropdown.svg"
                            width={8}
                            height={8}
                          />
                        }
                        onChange={(e) => {
                          setFilters({
                            ...filters,
                            audience_age: {
                              ...filters.audience_age,
                              max: e,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden 2xl:block h-auto w-[.05rem] bg-opacity-10 bg-black"></div>

              <div
                className="relative hidden 2xl:flex items-center cursor-pointer"
                ref={ref}
              >
                <div
                  className="rounded-md p-1 flex items-center justify-between space-x-4 px-2 cursor-pointer"
                  onClick={() => {
                    setFollowersRange(false);
                    setLocation(false);
                    setDateRange(false);
                    setGenderSelection(!genderSelection);
                  }}
                >
                  <span className="opacity-30 font-light">Audience gender</span>
                  <Image
                    alt=""
                    src="/images/dropdown.svg"
                    width={8}
                    height={8}
                  />
                </div>
                {genderSelection && (
                  <div className="bg-white p-2 flex flex-col space-y-2 absolute top-[4.5rem] shadow-lg w-72 z-50">
                    <div className="grid grid-cols-1">
                      <Select
                        className="py-3 px-2 filter  w-full sm:w-auto rounded-md"
                        placeholder="Audience Gender"
                        suffixIcon={
                          <Image
                            alt=""
                            src="/images/dropdown.svg"
                            width={8}
                            height={8}
                          />
                        }
                        value={filters?.audience_gender?.type}
                        dropdownClassName="dropdown-style"
                        onChange={(e) => {
                          const gender = {
                            type: e,
                            operator: "GT",
                            percentage_value: 20,
                          };
                          setFilters({
                            ...filters,
                            audience_gender: gender,
                          });
                        }}
                        options={[
                          { label: "ANY", value: "ANY" },
                          { label: "MALE", value: "MALE" },
                          { label: "FEMALE", value: "FEMALE" },
                        ]}
                      />
                    </div>
                    {filters?.audience_gender &&
                      filters?.audience_gender?.type !== "ANY" && (
                        <div className="flex flex-col p-2">
                          <div className="flex items-center">
                            <span className="text-base">
                              More than&nbsp;
                              <b>
                                {filters?.audience_gender?.percentage_value}
                              </b>
                              % audience's gender is&nbsp;
                              <b>{filters?.audience_gender?.type}</b>
                            </span>
                          </div>
                          <Slider
                            value={filters?.audience_gender?.percentage_value}
                            onChange={(newPercent) => {
                              setFilters({
                                ...filters,
                                audience_gender: {
                                  ...filters?.audience_gender,
                                  percentage_value: newPercent,
                                },
                              });
                            }}
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <>
                  <div className="h-auto w-[.05rem] bg-opacity-10 bg-black"></div>
                  <Select
                    mode="multiple"
                    className="py-3 px-2 filter w-full sm:w-auto rounded-md cursor-pointer"
                    style={{
                      width: "13rem",
                    }}
                    bordered={false}
                    placeholder="Creator brand affinities"
                    suffixIcon={
                      <Image
                        alt=""
                        src="/images/dropdown.svg"
                        width={8}
                        height={8}
                      />
                    }
                    dropdownClassName="dropdown-style"
                    onChange={(e) => {
                      setFilters({ ...filters, creator_brand_affinities: e });
                    }}
                    options={brands?.map((e) => {
                      return {
                        value: e?.name,
                        label: e?.name,
                      };
                    })}
                  />
                  <div className="h-auto w-[.05rem] bg-opacity-10 bg-black"></div>
                  <Select
                    mode="multiple"
                    style={{
                      width: "13rem",
                    }}
                    className="py-3 px-2 filter w-full sm:w-auto rounded-md cursor-pointer"
                    placeholder="Creators interest"
                    suffixIcon={
                      <Image
                        alt=""
                        src="/images/dropdown.svg"
                        width={8}
                        height={8}
                      />
                    }
                    onChange={(e) => {
                      setFilters({ ...filters, creator_interests: e });
                    }}
                    dropdownClassName="dropdown-style"
                    options={interests?.map((e) => {
                      return {
                        value: e?.name,
                        label: e?.name,
                      };
                    })}
                    bordered={false}
                  />
                </>
              ) : null}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="link"
                onClick={() => setFiltersMenu(!filtersMenu)}
                className="text-[#AF1FFC] border border-[#AF1FFC] more-filters"
                size="large"
              >
                More filters
              </Button>
              <Button
                className="gradient-bg"
                size="large"
                onClick={() => applyFilters()}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="w-full grid gap-4 mt-5"
            style={{
              gridTemplateColumns: ".2fr 1.2fr .2fr",
            }}
          >
            <div className="border border-gray bg-white p-3 rounded-md">
              <Select
                placeholder={
                  <div className="flex space-x-1 items-center">
                    <Image
                      alt=""
                      src={"/images/instaColored.svg"}
                      width={20}
                      height={20}
                    />
                    <span>Instagram</span>
                  </div>
                }
                bordered={false}
                onChange={handleSocialMediaChange}
              >
                {workPlatforms?.map((workPlatform) => (
                  <Option
                    value={workPlatform?.id}
                    className="flex justify-center relative p-5"
                  >
                    <div className="flex space-x-1 items-center">
                      <Image
                        alt=""
                        src={workPlatform?.logo_url}
                        width={20}
                        height={20}
                      />
                      <span>{workPlatform?.name}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </div>
            <div className="bg-white flex items-center justify-center rounded-md">
              <Input
                className="bg-white w-full text-lg"
                styles={{
                  input: {
                    background: "white",
                  },
                }}
                style={{
                  background: "white",
                }}
                bordered={false}
                placeholder="Search using username, @handle or profile link"
                onChange={(e) => setQueryText(e?.target?.value)}
              />
            </div>
            <button
              className="gradient-bg items-center justify-center flex py-2 px-4 rounded-md"
              onClick={() => searchResults()}
            >
              <span className="text-lg">Apply</span>
            </button>
          </div>
        )}
        {activeButton === "Search by Filter" ||
        activeButton === "Marketplace" ? (
          <div className="flex flex-col space-y-2">
            {filters ? (
              <FiltersBox
                filters={filters}
                setFilters={setFilters}
                applyFilters={applyFilters}
              />
            ) : null}
            <div className="my-4">
              <div className="flex justify-between mx-3">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    {data?.metadata?.total_results
                      ? formatNumber(data?.metadata?.total_results)
                      : 0}
                    &nbsp;creators found
                  </span>
                </div>
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
              {isLoading ||
              favouritesLoading ||
              applyingFiltersLoading ||
              searchingByKeywordLoading ? (
                <Loader />
              ) : (
                <div className="flex items-start justify-center xl:justify-start my-3">
                  {isGridView ? (
                    <div className="flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data?.data?.map((collection, index) => {
                          if (user?.trialVersion && !user?.admin) {
                            if (index < 7) {
                              return (
                                <FeaturedCollection
                                  key={index}
                                  collection={collection}
                                  favourites={favourites}
                                  bookmarks={bookmarks}
                                  selectedWorkPlatform={selectedWorkPlatform}
                                />
                              );
                            }
                          } else {
                            return (
                              <FeaturedCollection
                                key={index}
                                collection={collection}
                                favourites={favourites}
                                bookmarks={bookmarks}
                                selectedWorkPlatform={selectedWorkPlatform}
                              />
                            );
                          }
                        })}
                      </div>
                      {user?.trialVersion && !user?.admin ? null : (
                        <div className="w-full flex items-center justify-center mt-10">
                          <Pagination
                            current={data?.metadata?.offset / 50 + 1}
                            pageSize={50}
                            showSizeChanger={false}
                            total={data?.metadata?.total_results}
                            onChange={handlePageChange}
                            style={{}}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative w-full">
                      <Table
                        className="w-full"
                        // rowClassName="cursor-pointer hover:bg-gray"
                        rowClassName={rowClassName}
                        columns={columns}
                        dataSource={data?.data}
                        scroll={{ x: 1000 }}
                        pagination={{
                          current: data?.metadata?.offset / 50 + 1,
                          total: data?.metadata?.total_results,
                          pageSize: 50,
                          onChange: handlePageChange,
                        }}
                        onRow={(record, rowIndex) => {
                          if (user?.trialVersion && !user?.admin) {
                            if (rowIndex < 7) {
                              return {
                                onClick: (event) => {
                                  if (
                                    event?.target?.tagName === "BUTTON" ||
                                    event?.target?.tagName === "svg"
                                  ) {
                                    return;
                                  } else {
                                    router.push(
                                      `/influencer-details?identifier=${record.platform_username}&work_platform_id=${record?.work_platform?.id}`
                                    );
                                  }
                                },
                              };
                            } else {
                              return;
                            }
                          } else {
                            return {
                              onClick: (event) => {
                                if (
                                  event?.target?.tagName === "BUTTON" ||
                                  event?.target?.tagName === "svg"
                                ) {
                                  return;
                                } else {
                                  router.push(
                                    `/influencer-details?identifier=${record.platform_username}&work_platform_id=${record?.work_platform?.id}`
                                  );
                                }
                              },
                            };
                          }
                          // if (
                          //   rowIndex < 7 &&
                          //   user?.trialVersion &&
                          //   !user?.admin
                          // ) {
                          //   return {
                          //     onClick: (event) => {
                          //       if (
                          //         event?.target?.tagName === "BUTTON" ||
                          //         event?.target?.tagName === "svg"
                          //       ) {
                          //         return;
                          //       } else {
                          //         router.push(
                          //           `/influencer-details?identifier=${record.platform_username}&work_platform_id=${record?.work_platform?.id}`
                          //         );
                          //       }
                          //     },
                          //   };
                          // }
                        }}
                      />
                      {user?.trialVersion && !user?.admin ? (
                        <UnlockAccessModal />
                      ) : null}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : searchLoading ? (
          <Loader />
        ) : (
          <div className="my-4 ">
            <div className="flex justify-between mx-3">
              <h1 className="font-[700] text-[24px] fontMonst  xxl:mx-[3rem]">
                Search results
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-3 gap-3">
              {searchData?.map((collection, index) => (
                <SearchCard
                  key={index}
                  collection={collection}
                  favourites={favourites}
                  bookmarks={bookmarks}
                  workPlatform={
                    workPlatforms?.find((e) => e?.id === selectedWorkPlatform)
                      ?.name
                  }
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {filtersMenu && (
        <FiltersMenu
          menu={filtersMenu}
          setMenu={setFiltersMenu}
          filters={filters}
          setFilters={setFilters}
          brands={brands}
          locations={locations}
          languages={languages}
          interests={interests}
          applyFilters={applyFilters}
          selectedWorkPlatform={selectedWorkPlatform}
        />
      )}
    </div>
  );
}

export default Index;
