import Image from "next/image";
import { BiLogoTiktok } from "react-icons/bi";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";

function SearchCard({ collection, workPlatform }) {
  function formatNumber(number) {
   
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "k";
    } else {
      return number?.toString();
    }
  }

  return (
    <div
      className="featured-collection-card rounded-lg bg-white p-4 fontMonst md:w-[320px] 2xl:w-[400px] mx-2 cursor-pointer my-2"
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      }}
    >
      <div className="flex justify-between w-full">
        <div className="flex">
          <div className="relative rounded-full h-[50px] w-[50px]">
            <Image
              src={collection?.picture}
              alt="influencer image"
              fill
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="ml-3 flex flex-col justify-center">
            <div className="flex items-center space-x-2">
              <Link
                href={`/influencer-details?identifier=${collection.platform_username}&work_platform_id=${collection.work_platform?.id}`}
                className="hover:text-black"
              >
                <h1 className="font-[600] text-base leading-6 line-clamp-1">
                  {collection?.fullname}
                </h1>
              </Link>
              {collection?.is_verified ? (
                <Image src="/images/verify.svg" width={24} height={24} />
              ) : null}
            </div>
            <Link
              href={
                workPlatform === "Instagram"
                  ? `https://instagram.com/${collection?.username}`
                  : workPlatform === "YouTube"
                  ? `https://youtube.com/@${collection?.username}`
                  : `https://tiktok.com/@${collection?.username}`
              }
              className="text-[#4254FF4F] flex items-center space-x-1 text-sm w-fit capitalize hover:border-b"
              target="_blank"
            >
              {workPlatform === "Instagram" ? (
                <AiOutlineInstagram color={"#4254FF4F"} />
              ) : workPlatform === "YouTube" ? (
                <AiOutlineYoutube color={"#4254FF4F"} />
              ) : (
                <BiLogoTiktok color={"#4254FF4F"} />
              )}
              <span>@{collection?.username}</span>
              <FiExternalLink size={12} />
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 ">
        <p className="line-clamp-3">{collection?.introduction}</p>
      </div>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-base font-semibold">
            Followers/Subscribers:
          </span>
          <p className={"text-[#1198F6] font-medium"}>
            {formatNumber(collection?.followers)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
