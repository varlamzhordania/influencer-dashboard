import React, { useEffect, useRef, useState } from "react";
import Influencer from "@/components/Influencer";
import Performance from "@/components/Performance";
import GenderPieChart from "@/components/GenderPieChart";
import Head from "next/head";
import AudienceHistory from "@/components/AudienceHistory";
import { Table, Image } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/Loader";
import getGraphData from "@/utils/getGraphData";
import getAgeRangeData from "@/utils/getAgeRangeData";
import getCountryDistribution from "@/utils/getCountryDistribution";
import DistributionGraph from "@/components/DistributionGraph";
import moment from "moment";
import formatNumber from "@/utils/formatNumber";
import { IoArrowBackOutline } from "react-icons/io5";
import { VscMention } from "react-icons/vsc";
import Link from "next/link";
import PerformanceItem from "@/components/PerformanceItem";
import {
  AiOutlineComment,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineTag,
  AiOutlineUnlock,
} from "react-icons/ai";
import InfluencerPostCard from "@/components/InfluencerPostCard";
import Mentions from "@/components/InfluencerDetails/Performance/Mentions";
import { RiUserHeartLine } from "react-icons/ri";
import { FiHash } from "react-icons/fi";
import Growth from "@/components/InfluencerDetails/Growth";
import Audience from "@/components/InfluencerDetails/Audience";
import AudienceDemographics from "@/components/InfluencerDetails/Audience/AudienceDemographics";
import getLanguageDistribution from "@/utils/getLanguageDistribution";
import getEthnicityDistribution from "@/utils/getEthnicityDistribution";
import AudienceBrandInterest from "@/components/InfluencerDetails/Audience/AudienceBrandInterest";
import AudienceType from "@/components/InfluencerDetails/Audience/AudienceType";
import SimilarAudience from "@/components/InfluencerDetails/SimilarAudience";
import SimilarCreators from "@/components/InfluencerDetails/SimilarCreators";
import influencersApi from "@/lib/influencers";
import { useAuth } from "../../context/AuthContext";
import UpgradeModal from "@/components/UpgradeModal";
import planUsage from "@/constants/plan";
import Cookies from "js-cookie";

function InfluencerDetail() {
  const router = useRouter();
  const { user } = useAuth();
  const pdfRef = useRef();
  const { identifier, work_platform_id } = router.query;
  const tabs = ["Performance", "Growth", "Audience", "Similar creators"];
  const [activeSection, setActiveSection] = useState("Performance");
  const sectionRefs = tabs.map(React.createRef);
  const [isEligible, setIsEligible] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false);
  const contentTabs = ["Top content", "Sponsored content"];
  const [contentTab, setContentTab] = useState("Top content");

  const { data: details, isLoading } = useQuery(
    [identifier, work_platform_id],
    async () => {
      // const userPlan = await influencersApi.getUserPlan(user?.uid);
      if (
        // !userPlan ||
        // !userPlan?.influencerProfileAnalysis ||
        user?.influencerProfileAnalysis <= 0 &&
        !user?.admin
      ) {
        setIsEligible(false);
      } else {
        setIsEligible(true);
        if (!user?.admin) {
          const willIncreament = Cookies.get("influencerProfileAnalysis");
          if (!willIncreament) {
            await influencersApi.updateUsage(
              user?.uid,
              planUsage.INFLUENCER_PROFILE_ANALYSIS
            );
          }
        }

        Cookies.set("influencerProfileAnalysis", true);

        const response = await axios.post("/api/influencers/profile", {
          identifier,
          work_platform_id,
        });
        const graphsData = getGraphData(
          response?.data?.profile?.reputation_history
        );
        const ageDistribution = getAgeRangeData(
          response?.data?.profile?.audience?.gender_age_distribution
        );
        const countryDistribution = getCountryDistribution(
          response?.data?.profile?.audience?.countries
        );
        const languageDistribution = getLanguageDistribution(
          response?.data?.profile?.audience?.languages
        );
        const ethnicityDistribution = getEthnicityDistribution(
          response?.data?.profile?.audience?.ethnicities
        );
        let genderDistribution = { male: 0, female: 0 };
        response.data?.profile?.audience?.gender_distribution?.map((e) => {
          if (e?.gender?.toLowerCase() === "male") {
            genderDistribution.male = e?.value?.toFixed(2);
          } else if (e?.gender?.toLowerCase() === "female") {
            genderDistribution.female = e?.value?.toFixed(2);
          }
        });
        return {
          profileData: response.data,
          graphsData,
          genderDistribution,
          ageDistribution,
          countryDistribution,
          languageDistribution,
          ethnicityDistribution,
        };
      }
      return true;
    },
    {
      enabled: !!identifier || !!work_platform_id,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const handleRouteChange = (url) => {
      Cookies.remove("influencerProfileAnalysis");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      for (let i = 0; i < tabs?.length; i++) {
        const section = sectionRefs[i].current;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(tabs[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tabs]);

  // const columns1 = [
  //   {
  //     title: <span></span>,
  //     dataIndex: "name",
  //     className: "fontMonst",
  //     render: (_, record) => (
  //       <Image src={record?.thumbnail_url} width={100} height={100} />
  //     ),
  //   },
  //   {
  //     title: <span className="flex justify-center">Description</span>,
  //     dataIndex: "description",
  //     className: "fontMonst",
  //     render: renderSocialPlatforms,
  //   },
  //   {
  //     title: <span className="flex justify-center">Views</span>,
  //     dataIndex: "views",
  //     className: "fontMonst",
  //     render: (text) => (
  //       <span
  //         className="flex justify-center"
  //         style={{ fontWeight: 600, textAlign: "center" }}
  //       >
  //         {text}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: <span className="flex justify-center">Success Rate</span>,
  //     dataIndex: "successRate",
  //     className: "fontMonst",
  //     render: (text) => (
  //       <span
  //         className="flex justify-center"
  //         style={{ fontWeight: 600, color: "#4254FF", textAlign: "center" }}
  //       >
  //         {text}%
  //       </span>
  //     ),
  //   },
  //   {
  //     title: <span className="flex justify-center">Start Date</span>,
  //     dataIndex: "startDate",
  //     className: "fontMonst",
  //     render: (text) => (
  //       <span
  //         className="flex justify-center"
  //         style={{ fontWeight: 600, textAlign: "center" }}
  //       >
  //         {text}
  //       </span>
  //     ),
  //   },
  // ];
  const columns = [
    {
      title: <span></span>,
      dataIndex: "name",
      className: "fontMonst",
      render: (_, record) => (
        <Image src={record?.thumbnail_url} width={100} height={100} />
      ),
    },
    {
      title: <span className="flex justify-center">Description</span>,
      dataIndex: "description",
      className: "fontMonst",
      render: (_, record) => (
        <p className="font-semibold text-center line-clamp-1">
          {record?.description}
        </p>
      ),
    },
    {
      title: <span className="flex justify-center">Type</span>,
      dataIndex: "type",
      className: "fontMonst",
      render: (_, record) => (
        <span className="flex justify-center font-semibold text-center capitalize">
          {record?.type}
        </span>
      ),
    },
    {
      title: <span className="flex justify-center">Likes</span>,
      dataIndex: "likes",
      className: "fontMonst",
      render: (_, record) => (
        <span className="flex justify-center font-semibold text-center">
          {formatNumber(record?.engagement?.like_count)}
        </span>
      ),
    },
    {
      title: <span className="flex justify-center">Comments</span>,
      dataIndex: "comments",
      className: "fontMonst",
      render: (_, record) => (
        <span className="flex justify-center font-semibold text-center">
          {formatNumber(record?.engagement?.comment_count)}
        </span>
      ),
    },
    {
      title: <span className="flex justify-center">Publish Date</span>,
      dataIndex: "publishDate",
      className: "fontMonst",
      render: (_, record) => (
        <span className="flex justify-center font-semibold text-center">
          {moment(record?.published_at).format("DD/MM/YYYY")}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-full">
      <Head>
        <title>Creator Discovery</title>
      </Head>
      {isEligible ? (
        <div className="bg-white h-full my-4 mx-2 rounded-md" ref={pdfRef}>
          <div className="p-5 cursor-pointer" onClick={() => router.back()}>
            <IoArrowBackOutline size={30} />
          </div>
          <div className="px-3 w-full flex-col flex lg:flex-row">
            <Influencer data={details?.profileData} pdfRef={pdfRef} />
            {/* <Performance
            data={details?.profileData}
            graphsData={details?.graphsData}
          /> */}
          </div>
          <div className="flex items-center justify-center space-x-10 border-t border-b p-5 border-gray sticky w-full top-0 bg-white z-50">
            {tabs?.map((tab, i) => (
              <div
                // href={`#${tab}`}
                className={`text-lg opacity-80 hover:text-blue-900 font-medium cursor-pointer hover:border-b hover:border-blue-900 hover:border-dotted ${
                  activeSection === tab
                    ? "text-blue-900 border-b border-dotted border-blue-900"
                    : ""
                }`}
                key={tab}
                onClick={() => {
                  sectionRefs[i]?.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {tab}
              </div>
            ))}
          </div>
          <div
            className="flex flex-col p-5 space-y-8"
            ref={sectionRefs[0]}
            id="Performance"
          >
            <h1 className="text-2xl font-bold fontMonst">Performance</h1>
            <div className="grid grid-cols-4 gap-10 py-10">
              <PerformanceItem
                value={
                  details?.profileData?.profile?.follower_count
                    ? formatNumber(
                        details?.profileData?.profile?.follower_count
                      )
                    : formatNumber(
                        details?.profileData?.profile?.subscriber_count
                      )
                }
                title="Followers"
                icon={
                  <Image src="/images/followers.svg" width={30} height={30} />
                }
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.engagement_rate
                    ? `${Number(
                        details?.profileData?.profile?.engagement_rate
                      ).toFixed(3)}%`
                    : "-"
                }
                title="Engagement rate"
                icon={""}
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.sponsored_posts_performance
                    ? `${details?.profileData?.profile?.sponsored_posts_performance}%`
                    : "-"
                }
                title="Sponsored posts performance"
                icon={""}
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.average_likes
                    ? formatNumber(details?.profileData?.profile?.average_likes)
                    : "-"
                }
                title="Average likes per post"
                icon={<AiOutlineHeart size={30} className="opacity-70" />}
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.average_comments
                    ? formatNumber(
                        details?.profileData?.profile?.average_comments
                      )
                    : "-"
                }
                title="Average comments per post"
                icon={<AiOutlineComment size={30} className="opacity-70" />}
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.average_views
                    ? formatNumber(details?.profileData?.profile?.average_views)
                    : "-"
                }
                title="Average views per video"
                icon={<AiOutlineEye size={30} className="opacity-70" />}
              />
              <PerformanceItem
                value={
                  details?.profileData?.profile?.average_reels_views
                    ? formatNumber(
                        details?.profileData?.profile?.average_reels_views
                      )
                    : "-"
                }
                title="Average views per reel"
                icon={<AiOutlineEye size={30} className="opacity-70" />}
              />
            </div>
            <div className="flex fontRob space-x-3 justify-between items-center bg-white rounded-md p-2 w-full flex-wrap ">
              <div className="flex items-start justify-center sm:justify-start w-full sm:w-auto py-2 px-2 fontRob bg-[#AF1FFC24] rounded-md ">
                {contentTabs?.map((e) => (
                  <button
                    className={`py-2 px-2  ${
                      contentTab === e ? "gradient-bg rounded-md" : ""
                    }`}
                    onClick={() => setContentTab(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            {contentTab === "Top content" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {details?.profileData?.profile?.top_contents?.map((e, i) => {
                  if (i <= 2) {
                    return (
                      <InfluencerPostCard
                        data={e}
                        profile={details?.profileData}
                      />
                    );
                  }
                })}
              </div>
            )}
            {contentTab === "Sponsored content" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {details?.profileData?.profile?.sponsored_contents?.map(
                  (e, i) => {
                    if (i <= 2) {
                      return (
                        <InfluencerPostCard
                          data={e}
                          profile={details?.profileData}
                        />
                      );
                    }
                  }
                )}
              </div>
            )}
            {details?.profileData?.profile?.brand_affinity &&
            details?.profileData?.profile?.brand_affinity?.length > 0 ? (
              <Mentions
                icon={<AiOutlineTag size={20} />}
                title={"Creator's brand affinity"}
                subTitle={"Brands creator interact with"}
                tags={details?.profileData?.profile?.brand_affinity}
                type="brand"
              />
            ) : null}
            {details?.profileData?.profile?.top_interests &&
            details?.profileData?.profile?.top_interests?.length > 0 ? (
              <Mentions
                icon={<RiUserHeartLine size={20} />}
                title={"Creator's interests"}
                subTitle={"Interests and topics that the creator posts about"}
                tags={details?.profileData?.profile?.top_interests}
                type="interest"
              />
            ) : null}
            {details?.profileData?.profile?.top_hashtags &&
            details?.profileData?.profile?.top_hashtags?.length > 0 ? (
              <Mentions
                icon={<FiHash size={20} />}
                title={"Frequently used hashtags"}
                subTitle={
                  "Hashtags frequently used by the creator in their content"
                }
                tags={details?.profileData?.profile?.top_hashtags}
                type="hash"
              />
            ) : null}
            {details?.profileData?.profile?.top_mentions &&
            details?.profileData?.profile?.top_mentions?.length > 0 ? (
              <Mentions
                icon={<VscMention size={30} />}
                title={"Frequently tagged accounts"}
                subTitle={
                  "Accounts frequently tagged by the creator in their content"
                }
                tags={details?.profileData?.profile?.top_mentions}
                type="mention"
              />
            ) : null}
          </div>

          <div
            className="flex flex-col p-5 space-y-8"
            id="Growth"
            ref={sectionRefs[1]}
          >
            <h1 className="text-2xl font-bold">Growth</h1>
            <Growth data={details?.graphsData} />
          </div>
          <div
            className="flex flex-col p-5 space-y-8"
            id="Audience"
            ref={sectionRefs[2]}
          >
            <h1 className="text-2xl font-bold">Audience</h1>
            <Audience data={details} />
            <div className="flex flex-col p-5 space-y-8">
              <h1 className="text-xl font-bold">Audience demographics</h1>
              <AudienceDemographics data={details} />
            </div>
            <AudienceBrandInterest data={details} />
            <AudienceType
              graphData={
                details?.profileData?.profile?.audience?.follower_types
              }
            />
            {details?.profileData?.profile?.audience?.lookalikes &&
            details?.profileData?.profile?.audience?.lookalikes?.length > 0 ? (
              <div
                className="flex flex-col p-5 space-y-8"
                id="Similar audience"
              >
                <h1 className="text-xl font-bold">
                  Creators with similar audience
                </h1>
                <SimilarAudience
                  data={details?.profileData?.profile?.audience?.lookalikes}
                />
              </div>
            ) : null}
          </div>
          {details?.profileData?.profile?.lookalikes &&
          details?.profileData?.profile?.lookalikes?.length > 0 ? (
            <div
              className="flex flex-col p-5 space-y-8"
              id="Similar audience"
              ref={sectionRefs[3]}
            >
              <h1 className="text-2xl font-bold">Similar creators</h1>
              <SimilarCreators
                data={details?.profileData?.profile?.lookalikes}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex space-x-4 ">
            <div className="w-20 h-20 rounded-full bg-gray flex items-center justify-center">
              <AiOutlineUnlock color="#8F56CD" size={40} />
            </div>
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-bold">
                Upgrade to analyze more creators
              </h1>
              <span className="text-base font-light opacity-50 max-w-sm">
                Get detailed insights on each creator, and share them with your
                team or clients.
              </span>
              <Link
                href={{
                  pathname: "/plan&billing",
                  query: { tab: "3" },
                }}
                className={`rounded-md py-2 px-5 my-3 w-fit text-lg font-semibold`}
                style={{
                  background:
                    "linear-gradient(270.75deg, #FF5B84 -51.86%, #4254FF 107.54%)",
                  color: "white",
                  fontWeight: 400,
                }}
              >
                See plans
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* <UpgradeModal visible={isEligible} /> */}
    </div>
  );
}

export default InfluencerDetail;
