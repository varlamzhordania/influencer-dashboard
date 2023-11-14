import formatNumber from "@/utils/formatNumber";
import MinMaxFilter from "./MinMaxFilter";
import NameWithPercentageFilter from "./NameWithPercentageFilter";
import ListFilter from "./ListFilter";
import OnlyNameFilter from "./OnlyNameFilter";

const FiltersBox = ({ filters, setFilters, applyFilters }) => {
  const handleResetFilter = (filterKey) => {
    // Create a copy of the current filters object
    const updatedFilters = { ...filters };

    if (filterKey === "follower_count") {
      // Remove the filter by its key
      delete updatedFilters[filterKey];
      delete updatedFilters["subscriber_count"];
    } else {
      delete updatedFilters[filterKey];
    }
    if (Object.keys(updatedFilters)?.length > 0) {
      // Update the state with the new filters
      setFilters(updatedFilters);
    } else {
      setFilters(null);
      applyFilters()
    }
  };

  return (
    <div className="py-2">
      <div className="w-full bg-lightgray flex flex-col sm:flex-row justify-between rounded-md p-3 sm:p-5">
        <div className="flex flex-wrap gap-3">
          {filters?.follower_count || filters?.subscriber_count ? (
            <MinMaxFilter
              title="Followers"
              reset={() => handleResetFilter("follower_count")}
              min={
                filters?.follower_count
                  ? formatNumber(filters?.follower_count?.min)
                  : formatNumber(filters?.subscriber_count?.min)
              }
              max={
                filters?.follower_count
                  ? formatNumber(filters?.follower_count?.max)
                  : formatNumber(filters?.subscriber_count?.max)
              }
            />
          ) : null}
          {filters?.audience_locations ? (
            <NameWithPercentageFilter
              title="Audience location"
              values={filters?.audience_locations}
              reset={() => handleResetFilter("audience_locations")}
            />
          ) : null}
          {filters?.audience_language ? (
            <NameWithPercentageFilter
              title="Audience language"
              values={filters?.audience_language}
              reset={() => handleResetFilter("audience_language")}
            />
          ) : null}
          {filters?.audience_age ? (
            <MinMaxFilter
              title="Audience age"
              min={filters?.audience_age?.min}
              max={filters?.audience_age?.max}
              percentage_value={filters?.audience_age?.percentage_value}
              reset={() => handleResetFilter("audience_age")}
            />
          ) : null}
          {filters?.audience_gender &&
          filters?.audience_gender?.type !== "ANY" ? (
            <MinMaxFilter
              title="Audience gender"
              value={filters?.audience_gender?.type}
              percentage_value={filters?.audience_gender?.percentage_value}
              reset={() => handleResetFilter("audience_gender")}
            />
          ) : null}
          {filters?.creator_brand_affinities ? (
            <ListFilter
              title="Creator's brand affinities"
              values={filters?.creator_brand_affinities}
              reset={() => handleResetFilter("creator_brand_affinities")}
            />
          ) : null}
          {filters?.creator_interests ? (
            <ListFilter
              title="Creator's interests"
              values={filters?.creator_interests}
              reset={() => handleResetFilter("creator_interests")}
            />
          ) : null}
          {filters?.creator_gender ? (
            <OnlyNameFilter
              title="Creator gender"
              value={filters?.creator_gender}
              reset={() => handleResetFilter("creator_gender")}
            />
          ) : null}
          {filters?.account_type ? (
            <OnlyNameFilter
              title="Account type"
              value={filters?.account_type}
              reset={() => handleResetFilter("account_type")}
            />
          ) : null}
          {filters?.creator_language ? (
            <OnlyNameFilter
              title="Creator language"
              value={filters?.creator_language}
              reset={() => handleResetFilter("creator_language")}
            />
          ) : null}
          {filters?.hashtags ? (
            <ListFilter
              title="Hashtags"
              values={filters?.hashtags}
              reset={() => handleResetFilter("hashtags")}
            />
          ) : null}
          {filters?.mentions ? (
            <ListFilter
              title="Mentions"
              values={filters?.mentions}
              reset={() => handleResetFilter("mentions")}
            />
          ) : null}
          {filters?.creator_locations ? (
            <ListFilter
              title="Creator's location"
              values={filters?.creator_locations}
              reset={() => handleResetFilter("creator_locations")}
            />
          ) : null}
          {filters?.audience_brand_affinities ? (
            <ListFilter
              title="Audience brand affinities"
              values={filters?.audience_brand_affinities}
              reset={() => handleResetFilter("audience_brand_affinities")}
            />
          ) : null}
          {filters?.audience_interest_affinities ? (
            <ListFilter
              title="Audience interests"
              values={filters?.audience_interest_affinities}
              reset={() => handleResetFilter("audience_interest_affinities")}
            />
          ) : null}
          {filters?.content_count ? (
            <MinMaxFilter
              title="Number of contents"
              reset={() => handleResetFilter("content_count")}
              min={formatNumber(filters?.content_count?.min)}
              max={formatNumber(filters?.content_count?.max)}
            />
          ) : null}
          {filters?.average_likes ? (
            <MinMaxFilter
              title="Average likes"
              reset={() => handleResetFilter("average_likes")}
              min={formatNumber(filters?.average_likes?.min)}
              max={formatNumber(filters?.average_likes?.max)}
            />
          ) : null}
          {filters?.reel_views ? (
            <MinMaxFilter
              title="Reel views"
              reset={() => handleResetFilter("reel_views")}
              min={formatNumber(filters?.reel_views?.min)}
              max={formatNumber(filters?.reel_views?.max)}
            />
          ) : null}
          {filters?.follower_growth ? (
            <OnlyNameFilter
              title="Follower growth"
              value={`${filters?.follower_growth?.interval} Month, >${filters?.follower_growth?.percentage_value}%`}
              reset={() => handleResetFilter("follower_growth")}
            />
          ) : null}
          {filters?.engagement_rate ? (
            <OnlyNameFilter
              title="Engagement rate"
              value={`≥ ${filters?.engagement_rate?.percentage_value}%`}
              reset={() => handleResetFilter("engagement_rate")}
            />
          ) : null}
          {filters?.audience_lookalikes ? (
            <OnlyNameFilter
              title="Audience lookalike"
              value={filters?.audience_lookalikes}
              reset={() => handleResetFilter("audience_lookalikes")}
            />
          ) : null}
          {filters?.creator_lookalikes ? (
            <OnlyNameFilter
              title="Creator's lookalike"
              value={filters?.creator_lookalikes}
              reset={() => handleResetFilter("creator_lookalikes")}
            />
          ) : null}
          {filters?.topic_relevance ? (
            <ListFilter
              title="Topics"
              values={filters?.topic_relevance?.name}
              reset={() => handleResetFilter("topic_relevance")}
            />
          ) : null}
          {filters?.is_verified ? (
            <OnlyNameFilter
              title="Is verified"
              reset={() => handleResetFilter("is_verified")}
            />
          ) : null}
          {filters?.has_contact_details ? (
            <OnlyNameFilter
              title="Has contact details"
              reset={() => handleResetFilter("has_contact_details")}
            />
          ) : null}
          {filters?.has_sponsored_posts ? (
            <OnlyNameFilter
              title="Has sponsored posts"
              reset={() => handleResetFilter("has_sponsored_posts")}
            />
          ) : null}
        </div>
        <span
          className="text-base sm:text-lg font-semibold underline w-full sm:w-[20%] cursor-pointer"
          onClick={() => {
            setFilters(null);
            applyFilters();
          }}
        >
          Remove all filters
        </span>
      </div>
    </div>
  );
};

export default FiltersBox;
