import { CloseOutlined } from "@mui/icons-material";

const MinMaxFilter = ({
  title,
  min,
  max,
  percentage_value = null,
  value = null,
  reset,
}) => {
  return (
    <div className="hover:bg-white hover:rounded-full p-2 hover:outline hover:outline-1 cursor-pointer flex items-center space-x-1 transition-all duration-200">
      {percentage_value ? (
        <div className="flex items-center space-x-1">
          <span className="text-sm sm:text-base font-medium opacity-70">
            {title}: {value ? value : `${min} - ${max}`},
          </span>
          <span className="text-sm sm:text-base font-medium opacity-70">
            {`>${percentage_value}%`}
          </span>
        </div>
      ) : (
        <span className="text-sm sm:text-base font-medium opacity-70">
          {title}: {min} - {max}
        </span>
      )}
      <div onClick={() => reset()}>
        <CloseOutlined className="cursor-pointer opacity-50" size={10} />
      </div>
    </div>
  );
};

export default MinMaxFilter;
