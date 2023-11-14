import { CloseOutlined } from "@mui/icons-material";

const OnlyNameFilter = ({ title, reset, value }) => {
  return (
    <div className="hover:bg-white hover:rounded-full p-2 hover:outline hover:outline-1 cursor-pointer flex items-center space-x-1 transition-all duration-200">
      <div className="flex items-center space-x-2">
        {value ? (
          <span className="text-sm sm:text-base font-medium opacity-70">
            {title}: {value?.name ? value?.name : value}
          </span>
        ) : (
          <span className="text-sm sm:text-base font-medium opacity-70">{title}</span>
        )}
      </div>
      <CloseOutlined
        onClick={() => reset()}
        className="cursor-pointer opacity-50"
        size={10}
      />
    </div>
  );
};

export default OnlyNameFilter;
