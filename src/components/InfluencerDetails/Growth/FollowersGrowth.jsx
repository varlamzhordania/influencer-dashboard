import GrowthGraph from "./GrowthGraph";

const FollowersGrowth = ({ graphsData }) => {
  const data = {
    labels: graphsData?.month,
    datasets: [
      {
        label: "Followers",
        data: graphsData?.follower_count,
        borderColor: "#4254FF",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-xl font-bold">Followers growth</span>
        <span className="text-lg font-bold opacity-50">
          Monthly trend of total followers
        </span>
      </div>
      <GrowthGraph data={data} />
    </div>
  );
};

export default FollowersGrowth;
