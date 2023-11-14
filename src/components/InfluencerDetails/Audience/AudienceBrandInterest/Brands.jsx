import { Progress } from "antd";

const Brands = ({ data }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <span className="text-xl font-bold">Audience brand affinity</span>
        <span className="text-base font-bold opacity-70">
          Brands followed by the audience
        </span>
      </div>
      <div className="flex flex-col space-y-2 h-72 overflow-scroll md:pr-5">
        {data?.profileData?.profile?.audience?.brand_affinity?.map((e) => (
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-between">
              <span className="text-base font-bold">{e?.name}</span>
              <span className="text-base font-bold">{Number(e?.value).toFixed(2) || 0}%</span>
            </div>
            <Progress showInfo={false} percent={e?.value || 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
