import AudienceLocation from "./AudienceLocation";
import GenderDistribution from "./GenderDistribution";

const Audience = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <GenderDistribution details={data} />
      <AudienceLocation data={data} />
    </div>
  );
};

export default Audience;
