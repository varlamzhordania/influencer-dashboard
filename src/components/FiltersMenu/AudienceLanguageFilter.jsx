import { useState } from "react";
import MenuItem from "./MenuItem";
import { Select, Slider } from "antd";
import Image from "next/image";

const AudienceLanguageFilter = ({ languages, filters, setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <MenuItem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Audience language"}
        active={filters?.audience_language ? true : false}
      />
      {isOpen ? (
        <div className="bg-white p-2 grid grid-cols-1 w-52">
          <Select
            placeholder="Any"
            showSearch
            // suffixIcon={
            //   <Image src="/images/dropdown.svg" width={8} height={8} />
            // }
            options={languages?.map((language) => {
              return {
                label: language?.name,
                value: language?.code,
              };
            })}
            onChange={(e) => {
              const lang = [
                {
                  code: e,
                  percentage_value: filters?.audience_language?.percentage_value
                    ? filters?.audience_language?.percentage_value
                    : 20,
                  name: languages?.find((lang) => lang?.code === e)?.name,
                },
              ];
              setFilters({
                ...filters,
                audience_language: lang,
              });
            }}
          />
          {filters?.audience_language ? (
            <div className="flex flex-col space-y-2">
              <span className="text-base">
                More than{" "}
                <b>{filters?.audience_language[0]?.percentage_value}</b>%
                audience's language is{" "}
                <b>
                  {
                    languages?.find(
                      (lang) =>
                        lang?.code === filters?.audience_language[0]?.code
                    )?.name
                  }
                </b>
              </span>
              <Slider
                value={filters?.audience_language[0]?.percentage_value}
                onChange={(newPercent) => {
                  setFilters({
                    ...filters,
                    audience_language: [
                      {
                        ...filters?.audience_language[0],
                        percentage_value: newPercent,
                      },
                    ],
                  });
                }}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AudienceLanguageFilter;
