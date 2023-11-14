import formatNumber from "@/utils/formatNumber";
import { Avatar } from "antd";
import moment from "moment";
import Image from "next/image";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineYoutube,
} from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";

const InfluencerPostCard = ({ data, profile }) => {
  return (
    <div className="bg-white border border-gray rounded-md flex flex-col p-5 space-y-4 shadow-lg">
      <div className="flex w-full items-center justify-between">
        <Avatar
          src={profile?.profile?.image_url ? profile?.profile?.image_url : ""}
          alt={`${profile?.profile?.full_name}'s Profile`}
          size={50}
        />
        <span className="text-base font-medium">
          {moment(data?.published_date).format("MMM DD, YYYY, hh:mm A")}
        </span>
        {profile?.work_platform?.name === "Instagram" ? (
          <Image src="/images/instagram.svg" width={25} height={25} />
        ) : profile?.work_platform?.name === "YouTube" ? (
          <Image src="/images/youtube.svg" width={25} height={25} />
        ) : (
          <Image src="/images/ticktok.svg" width={25} height={25} />
        )}
      </div>
      <div className="relative rounded-md h-[300px] w-full">
        <Image
          src={data?.thumbnail_url ? data?.thumbnail_url : ""}
          alt="Influencer image"
          fill={true}
          className="rounded-md"
        />
      </div>
      <span className="text-lg opacity-75 line-clamp-2">
        {data?.description}
      </span>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AiOutlineHeart size={20} opacity={30} />
          <span className="text-base font-semibold opacity-30">
            {data?.engagement?.like_count
              ? formatNumber(data?.engagement?.like_count)
              : "-"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <AiOutlineComment size={20} opacity={30} />
          <span className="text-base font-semibold opacity-30">
            {data?.engagement?.comment_count
              ? formatNumber(data?.engagement?.comment_count)
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerPostCard;
