import { CloseOutlined } from "@mui/icons-material";

const ListFilter = ({ title, values, reset }) => {
  return (
    <div className="hover:bg-white hover:rounded-full p-2 hover:outline hover:outline-1 cursor-pointer flex items-center space-x-1 transition-all duration-200">
      <div className="flex items-center space-x-2">
        <span className="text-sm sm:text-base font-medium opacity-70">{title}:</span>
        <div className="flex items-center space-x-2">
          {values?.map((e, i) => {
            return (
              <div key={i} className="flex items-center space-x-1">
                <span className="text-sm sm:text-base font-medium opacity-70">
                  {e?.value ? e?.value : e?.name ? e?.name : e}
                  {i === values?.length - 1 ? null : ", "}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <CloseOutlined
        onClick={() => reset()}
        className="cursor-pointer opacity-50"
        size={10}
      />
    </div>
  );
};

export default ListFilter;
