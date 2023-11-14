import Loader from "@/components/Loader";
import formatNumber from "@/utils/formatNumber";
import getTotalEngagement from "@/utils/getTotalEngagement";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiExternalLink } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import influencersApi from "@/lib/influencers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import planUsage from "@/constants/plan";
import { AiOutlineUnlock } from "react-icons/ai";
import Head from "next/head";
import NotEligible from "@/components/NotEligible";

const Analyze = () => {
  const router = useRouter();
  const { url } = router.query;
  const { user } = useAuth();
  const [isEligible, setIsEligible] = useState(false);

  const { data, isLoading } = useQuery(
    ["analyze", url],
    async () => {
      const userPlan = await influencersApi.getUserPlan(user?.uid);
      if (
        // !userPlan ||
        // !userPlan?.monitorPosts ||
        user?.monitorPosts <= 0 &&
        !user?.admin
      ) {
        setIsEligible(false);
      } else {
        setIsEligible(true);
        if (!user?.admin) {
          const willIncreament = Cookies.get("monitorPosts");
          if (!willIncreament) {
            await influencersApi.updateUsage(
              user?.uid,
              planUsage.POST_ANALYSIS
            );
          }
        }

        Cookies.set("monitorPosts", true);
        const res = await axios.post("/api/analyze", {
          content_url: url,
          work_platform_id:
            url?.includes("Instagram") || url?.includes("instagram")
              ? "9bb8913b-ddd9-430b-a66a-d74d846e6c66"
              : url?.includes("Tiktok") || url?.includes("tiktok")
              ? "de55aeec-0dc8-4119-bf90-16b3d1f0c987"
              : url?.includes("Youtu") || url?.includes("youtu")
              ? "14d9ddf5-51c6-415e-bde6-f8ed36ad7054"
              : "9bb8913b-ddd9-430b-a66a-d74d846e6c66",
        });
        return res.data;
      }
      return true;
    },
    {
      enabled: !!url,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const handleRouteChange = (url) => {
      Cookies.remove("monitorPosts");
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Post analysis</title>
      </Head>
      {isEligible ? (
        <div className="bg-white h-full my-4 mx-2 rounded-md p-5">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src={
                  data?.work_platform?.name === "Instagram"
                    ? "/images/instagram.svg"
                    : data?.work_platform?.name === "Tiktok"
                    ? "/images/ticktok.svg"
                    : "/images/youtube.svg"
                }
                width={40}
                height={40}
              />{" "}
              <span className="text-3xl font-semibold">
                {data?.work_platform?.name} post by{" "}
                {data?.profile?.platform_username}
              </span>
              <Image src="/images/verify.svg" width={28} height={28} />
            </div>
            <span className="text-sm font-medium">
              Posted {moment(data?.published_at).format("MMM DD, YYYY h:mm A")}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center space-x-2 relative border-2 border-gray rounded-md p-5">
            <Link
              href={data?.url}
              className="absolute right-4 font-bold text-base top-2 flex items-center space-x-1"
              target="_blank"
            >
              <span>View post</span>
              <FiExternalLink />
            </Link>
            <div className="relative h-52 w-full sm:w-52 mt-5 sm:mt-0">
              <Image
                src={data?.thumbnail_url}
                objectFit="cover"
                layout="fill"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-20">
              <p className="break-words max-w-4xl mt-5">{data?.description}</p>
              <div className="flex flex-wrap gap-5">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {data?.engagement?.like_count
                      ? formatNumber(data?.engagement?.like_count)
                      : "-"}
                  </span>
                  <span>likes</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {data?.engagement?.comment_count
                      ? formatNumber(data?.engagement?.comment_count)
                      : "-"}
                  </span>
                  <span>comments</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {data?.engagement?.share_count
                      ? formatNumber(data?.engagement?.share_count)
                      : "-"}
                  </span>
                  <span>shares</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {data?.engagement?.view_count
                      ? formatNumber(data?.engagement?.view_count)
                      : "-"}
                  </span>
                  <span>views</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 mt-10">
            <span className="text-2xl font-bold">Performance</span>
            <div className="flex flex-wrap gap-5">
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {data?.engagement?.engagement_rate
                    ? data?.engagement?.engagement_rate
                    : "-"}
                </span>
                <span>Engagement rate</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">
                  {data?.engagement
                    ? getTotalEngagement(data?.engagement)
                    : "-"}
                </span>
                <span>Total engagement</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">-</span>
                <span>Reach</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">-</span>
                <span>Impressions</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotEligible
          title="Upgrade to analyze more content"
          text="Get detailed insights on creators posts, and share them with your team or clients."
        />
      )}
    </>
  );
};

export default Analyze;
