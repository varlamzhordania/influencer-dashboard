import { Progress } from "antd";

const Cities = ({ data }) => {
  return (
    <div className="flex flex-col space-y-2 h-72 overflow-scroll md:pr-5">
      {data?.profileData?.profile?.audience?.cities?.map((e) => (
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-between">
            <span className="text-base font-bold">{e?.name}</span>
            <span className="text-base font-bold">{Number(e?.value)?.toFixed(2)}%</span>
          </div>
          <Progress showInfo={false} percent={e?.value} />
        </div>
      ))}
    </div>
  );
};

export default Cities;
