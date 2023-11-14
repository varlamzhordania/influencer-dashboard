import GenderPieChart from "@/components/GenderPieChart";

const GenderDistribution = ({ details }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-xl font-bold">Gender distribution</span>
      <GenderPieChart data={details?.genderDistribution} />
    </div>
  );
};

export default GenderDistribution;
