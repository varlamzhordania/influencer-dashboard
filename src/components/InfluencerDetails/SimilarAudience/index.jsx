import Card from "./Card";

const SimilarAudience = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {data?.map((e, i) => {
        if (i <= 5) return <Card data={e} key={e?.platform_username} />;
      })}
    </div>
  );
};

export default SimilarAudience;
