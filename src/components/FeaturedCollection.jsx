import Image from "next/image";
import React, { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import influencersApi from "@/lib/influencers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "antd";

function FeaturedCollection({
  collection,
  favourites,
  bookmarks,
  selectedWorkPlatform,
}) {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const [isAddedToBookmarks, setIsAddedToBookmarks] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favouriteMessage, setFavouriteMessage] = useState("");
  const [bookmarkMessage, setBookmarkMessage] = useState("");
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const queryClient = useQueryClient();

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

  const router = useRouter();

  const toggleFavorite = async (data) => {
    // e.stopPropagation();
    // if (!isFavorited) {
    //   setIsAddedToFavorites(true);

    //   setTimeout(() => {
    //     setIsAddedToFavorites(false);
    //   }, 3000);
    // }
    await influencersApi.favouriteInflencer(data);
    // setIsFavorited(!isFavorited);
    if (
      favourites?.find(
        (e) => e?.platform_username === collection?.platform_username
      )
    ) {
      setFavouriteMessage("Removed from favourites!");
    } else {
      setFavouriteMessage("Added to favourites!");
    }
  };

  const favouriteMutation = useMutation(
    ["favourites"],
    async (data) => {
      await influencersApi.favouriteInfluencer({ ...data, userId: user?.uid });
      if (
        favourites?.find(
          (e) => e?.platform_username === collection?.platform_username
        )
      ) {
        setFavouriteMessage("Removed from favourites!");
      } else {
        setFavouriteMessage("Added to favourites!");
      }
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
      if (
        bookmarks?.find(
          (e) => e?.platform_username === collection?.platform_username
        )
      ) {
        setBookmarkMessage("Removed from bookmarks!");
      } else {
        setBookmarkMessage("Added to bookmarks!");
      }
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["bookmarks"]);
      },
    }
  );

  const toggleSave = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (!isSaved) {
      setIsAddedToBookmarks(true);

      setTimeout(() => {
        setIsAddedToBookmarks(false);
      }, 3000);
    }
  };

  const changePage = () => {
    router.push(
      `/influencer-details?identifier=${collection.platform_username}&work_platform_id=${selectedWorkPlatform}`
    );
  };

  return (
    <div
      className="featured-collection-card rounded-lg bg-white p-4 fontMonst md:w-[320px] 2xl:w-[400px] mx-2 cursor-pointer my-2 h-48"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      {isAddedToBookmarks && (
        <div className="added-to-bookmarks-message fontMonst">
          Added to bookmarks!
        </div>
      )}
      {favouriteMessage !== "" && (
        <div className="added-to-bookmarks-message fontMonst">
          {favouriteMessage}
        </div>
      )}

      <div className="flex justify-between w-full">
        <div className="flex">
          <Avatar src={collection?.image_url} alt="profile picture" size={80} />
          <div className="ml-3 flex flex-col justify-center">
            <Link
              href={`/influencer-details?identifier=${collection.platform_username}&work_platform_id=${collection.work_platform?.id}`}
              className="hover:text-black"
            >
              <h1 className="font-[600] text-[20px] leading-6 line-clamp-1">
                {collection?.full_name}
              </h1>
            </Link>
            {/* <p className="text-[#4254FF4F] text-xs capitalize">
                {collection?.platform_account_type}
              </p> */}
            <div className="flex items-center space-x-1">
              <Link
                href={
                  collection?.work_platform?.name === "Instagram"
                    ? `https://instagram.com/${collection?.platform_username}`
                    : collection?.work_platform?.name === "YouTube"
                    ? `https://youtube.com/@${collection?.platform_username}`
                    : `https://tiktok.com/@${collection?.platform_username}`
                }
                className="text-[#4254FF4F] flex items-center space-x-1 text-sm w-fit capitalize hover:border-b"
                target="_blank"
              >
                {collection?.work_platform?.name === "Instagram" ? (
                  <AiOutlineInstagram color={"#4254FF4F"} />
                ) : collection?.work_platform?.name === "YouTube" ? (
                  <AiOutlineYoutube color={"#4254FF4F"} />
                ) : (
                  <BiLogoTiktok color={"#4254FF4F"} />
                )}
                <span>@{collection?.platform_username}</span>
                <FiExternalLink size={12} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <button onClick={() => bookmarkMutation.mutate(collection)}>
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
                (e) => e?.platform_username === collection?.platform_username
              ) ? (
                <FaBookmark size={20} />
              ) : (
                <BsBookmark size={20} color="#4254FF" />
              )}
            </IconContext.Provider>
          </button>
          <button
            onClick={() => favouriteMutation.mutate(collection)}
            className="flex justify-center items-center ml-1"
          >
            {favourites?.find(
              (e) => e?.platform_username === collection?.platform_username
            ) ? (
              <FavoriteIcon style={{ color: "#FF5B84" }} />
            ) : (
              <FavoriteBorderIcon style={{ color: "#FF5B84" }} />
            )}
          </button>
        </div>
      </div>
      <div className="my-4 ">
        <p className="line-clamp-3">{collection?.introduction}</p>
        {/* <div className="my-3">
          <h1 className="uppercase mb-1">Tags</h1>
          <div className="flex space-x-3 flex-wrap">
            {collection?.tags?.map((tag, index) => {
              return (
                <p
                  key={index}
                  className="bg-[#EBEDFF] font-[400] py-1 px-3 rounded-full"
                >
                  {tag}
                </p>
              );
            })}
          </div>
        </div> */}
      </div>
      <div className="flex space-x-4">
        <div className="flex items-center">
          <div>
            <Image
              src={
                collection?.work_platform?.name?.toLowerCase() === "facebook"
                  ? "/images/facebook.svg"
                  : collection?.work_platform?.name?.toLowerCase() ===
                    "instagram"
                  ? "/images/instaColored.svg"
                  : collection?.work_platform?.name?.toLowerCase() === "youtube"
                  ? "/images/youtube.svg"
                  : collection?.work_platform?.name?.toLowerCase() === "tiktok"
                  ? "/images/ticktok.svg"
                  : "/images/twitterColored.svg"
              }
              width={15}
              height={15}
              className="mr-1"
            />
          </div>
          <p
            className={
              collection?.work_platform?.name?.toLowerCase() === "facebook" ||
              collection?.work_platform?.name?.toLowerCase() === "twitter"
                ? "text-[#1198F6]"
                : collection?.work_platform?.name?.toLowerCase() ===
                    "instagram" ||
                  collection?.work_platform?.name?.toLowerCase() === "youtube"
                ? "text-[#FF0D4B]"
                : "text-[#ff0050]"
            }
          >
            {formatNumber(
              collection?.work_platform?.name?.toLowerCase() === "facebook" ||
                collection?.work_platform?.name?.toLowerCase() ===
                  "instagram" ||
                collection?.work_platform?.name?.toLowerCase() === "tiktok"
                ? collection?.follower_count
                : collection?.subscriber_count
            )}
          </p>
        </div>
        {/* {collection.socialMedia.map((social, index) => {
          return (
            <div className="flex items-center " key={index}>
              <div>
                <Image
                  src={social.img}
                  width={15}
                  height={15}
                  className="mr-1"
                />
              </div>
              <p
                className={
                  social.name === "facebook"
                    ? "text-[#1198F6]"
                    : social.name === "instagram"
                    ? "text-[#FF0D4B]"
                    : "text-[#1D9BF0]"
                }
              >
                {social.count}
              </p>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}

export default FeaturedCollection;
