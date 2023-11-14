import { CloseOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import MenuItem from "./MenuItem";
import FollowersFilter from "./FollowersFilter";
import CreatorBrandAffinity from "./CreatorBrandAffinity";
import NumberOfContentsFilter from "./NumberOfContentsFilter";
import CreatorGenderFilter from "./CreatorGenderFilter";
import IsVerifiedFilter from "./IsVerifiedFilter";
import HasContactDetailsFilter from "./HasContactDetailsFilter";
import CreatorLanguageFilter from "./CreatorLanguageFilter";
import CreatorInterestFilter from "./CreatorInterestFilter";
import CreatorLocationFilter from "./CreatorLocationFilter";
import AccountTypeFilter from "./AccountTypeFilter";
import HashtagFilter from "./HashtagFilter";
import MentionsFilter from "./MentionsFilter";
import AudienceLocationFilter from "./AudienceLocationFilter";
import AudienceAgeFilter from "./AudienceAgeFilter";
import AudienceLanguageFilter from "./AudienceLanguageFilter";
import AudienceGenderFilter from "./AudienceGenderFilter";
import AudienceBrandAffinity from "./AudienceBrandAffinity";
import AudienceInterestFilter from "./AudienceInterestFilter";
import AverageLikesFilter from "./AverageLikesFilter";
import EngagementRateFilter from "./EngagementRateFilter";
import HasSponsoredPosts from "./HasSponsoredPosts";
import ReelViewsFilter from "./ReelViewsFilter";
import FollowerGrowthFilter from "./FollowerGrowthFilter";
import AudienceLooksAlikeFilter from "./AudienceLooksAlikeFilter";
import CreatorLookAlikeFilter from "./CreatorLookAlikeFilter";

const FiltersMenu = ({
  menu,
  setMenu,
  filters,
  setFilters,
  brands,
  locations,
  languages,
  interests,
  applyFilters,
  selectedWorkPlatform,
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="modal flex justify-end z-50">
      <div onClick={() => setMenu(false)} className="overlay"></div>
      <div
        // ref={menuRef}
        className={`inset-y-0 bg-white text-[16px] w-[75%] h-screen shadow-lg py-5 border-[#D1D1D1] pr-2 sm:px-8 transition-transform duration-500 transform z-[40] ${
          menu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`flex flex-col space-y-6 w-full h-full overflow-y-auto px-8 relative`}
        >
          <div className="flex items-center justify-between w-full sticky top-0 bg-white z-50">
            <h1 className="text-2xl font-semibold">All Filters</h1>
            <CloseOutlined
              className="cursor-pointer"
              size={30}
              onClick={() => setMenu(!menu)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 sm:mt-5 gap-2">
            <div className="flex flex-col space-y-8">
              <h1 className="text-lg font-semibold">Creator</h1>
              <FollowersFilter
                filters={filters}
                setFilters={setFilters}
                selectedWorkPlatform={selectedWorkPlatform}
              />
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <CreatorBrandAffinity
                  brands={brands}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : null}
              <NumberOfContentsFilter
                filters={filters}
                setFilters={setFilters}
              />
              <CreatorGenderFilter filters={filters} setFilters={setFilters} />
              <IsVerifiedFilter filters={filters} setFilters={setFilters} />
              <HasContactDetailsFilter
                filters={filters}
                setFilters={setFilters}
              />
              <CreatorLanguageFilter
                filters={filters}
                setFilters={setFilters}
                languages={languages}
              />
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <CreatorInterestFilter
                  filters={filters}
                  setFilters={setFilters}
                  interests={interests}
                />
              ) : null}
              {/* <MenuItem title={"Most recent post"} /> */}
              <CreatorLocationFilter
                filters={filters}
                setFilters={setFilters}
                locations={locations}
                selectedWorkPlatform={selectedWorkPlatform}
              />
              {/* <MenuItem title={"Bio phrase"} /> */}
              <AccountTypeFilter filters={filters} setFilters={setFilters} />
              <HashtagFilter filters={filters} setFilters={setFilters} />
              <MentionsFilter filters={filters} setFilters={setFilters} />
            </div>
            <div className="flex flex-col space-y-8">
              <h1 className="text-lg font-semibold">Audience</h1>
              <AudienceLocationFilter
                filters={filters}
                setFilters={setFilters}
                locations={locations}
                selectedWorkPlatform={selectedWorkPlatform}
              />
              <AudienceAgeFilter filters={filters} setFilters={setFilters} />
              <AudienceLanguageFilter
                languages={languages}
                filters={filters}
                setFilters={setFilters}
              />
              <AudienceGenderFilter filters={filters} setFilters={setFilters} />
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <AudienceBrandAffinity
                  brands={brands}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : null}
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <AudienceInterestFilter
                  interests={interests}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : null}
            </div>
            <div className="flex flex-col space-y-8">
              <h1 className="text-lg font-semibold">Performance</h1>
              <AverageLikesFilter filters={filters} setFilters={setFilters} />
              <EngagementRateFilter filters={filters} setFilters={setFilters} />
              {selectedWorkPlatform ===
              "9bb8913b-ddd9-430b-a66a-d74d846e6c66" ? (
                <HasSponsoredPosts filters={filters} setFilters={setFilters} />
              ) : null}
              <ReelViewsFilter filters={filters} setFilters={setFilters} />
              <FollowerGrowthFilter filters={filters} setFilters={setFilters} />
              <AudienceLooksAlikeFilter
                selectedWorkPlatform={selectedWorkPlatform}
                filters={filters}
                setFilters={setFilters}
              />
              <CreatorLookAlikeFilter
                selectedWorkPlatform={selectedWorkPlatform}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
          <div className="flex items-center justify-between w-full sticky bottom-0 bg-white z-50">
            <button
              className="gradient-bg w-fit justify-center flex py-2 px-2 rounded-md font-semibold"
              onClick={() => applyFilters()}
            >
              Apply Filters
            </button>
            <button
              className="bg-white border-b font-semibold"
              onClick={() => {
                setFilters(null);
                applyFilters();
              }}
            >
              Remove all filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersMenu;
