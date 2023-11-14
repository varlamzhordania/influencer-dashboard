const PerformanceItem = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-1">
        {icon !== "" && icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <span className="text-base opacity-60 font-semibold">{title}</span>
    </div>
  );
};

export default PerformanceItem;
