import FollowersGrowth from "./FollowersGrowth";
import LikesGrowth from "./LikesGrowth";

const Growth = ({data}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <FollowersGrowth graphsData={data} />
      <LikesGrowth graphsData={data} />
    </div>
  );
};

export default Growth;
