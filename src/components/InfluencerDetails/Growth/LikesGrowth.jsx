import GrowthGraph from "./GrowthGraph";

const LikesGrowth = ({ graphsData }) => {
  const data = {
    labels: graphsData?.month,
    datasets: [
      {
        label: "Followers",
        data: graphsData?.average_likes,
        borderColor: "#4254FF",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-xl font-bold">Likes growth</span>
        <span className="text-lg font-bold opacity-50">
        Monthly trend of average likes per post
        </span>
      </div>
      <GrowthGraph data={data} />
    </div>
  );
};

export default LikesGrowth;
