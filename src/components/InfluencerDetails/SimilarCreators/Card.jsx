import formatNumber from "@/utils/formatNumber";
import { Avatar } from "antd";
import Link from "next/link";

const Card = ({ data }) => {
  return (
    <Link href={data?.url} target="_blank" className="hover:text-black">
      <div className="flex items-center space-x-4">
        <Avatar
          src={data?.image_url ? data?.image_url : ""}
          alt="profile picture"
          size={90}
        />
        <div className="flex flex-col">
          <span className="text-lg font-bold">{data?.platform_username}</span>
          <span className="opacity-60">
            {data?.follower_count
              ? formatNumber(data?.follower_count)
              : formatNumber(data?.subscriber_count)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
