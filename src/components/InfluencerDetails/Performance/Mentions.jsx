const Mentions = ({ tags, icon, title, subTitle, type }) => {
  return (
    <div className="flex flex-col space-y-2 max-w-lg">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{title}</span>
          <span className="text-base font-semibold opacity-50">{subTitle}</span>
        </div>
      </div>
      <div className="border border-gray rounded-md p-5 flex flex-wrap gap-5  h-52 overflow-scroll">
        {tags?.map((e) => (
          <div className="flex items-center justify-center rounded-full p-2 bg-slate-200 px-3 w-fit h-fit">
            <span className="text-sm font-semibold">
              {type === "mention" ? "@" : type === "hash" ? "#" : ""}
              {e?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentions;
