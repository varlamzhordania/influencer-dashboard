import React, { useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { Tabs, Card, Switch } from "antd";
const { TabPane } = Tabs;
import BillCard from "@/components/BillCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import influencersApi from "@/lib/influencers";
import { useRouter } from "next/router";
import paymentApi from "@/lib/payment";
import { useAuth } from "../../../context/AuthContext";
import moment from "moment";
import dayjs from "dayjs";
function Plan() {
  const router = useRouter();
  const { tab } = router.query;
  const { user } = useAuth();
  const data = [
    {
      id: 0,
      type: "Free Trial",
      price: 0,
      description: "Your first 14 days on a limited trial",
      btnColor: "bg-[#685F91]",
      textColor: "text-[#685F91]",
      btnText: "Downgrade",
    },
    {
      id: 1,
      type: "Basic",
      price: 79.99,
      description: "Limited marketing & growth hacks",
      details: [
        "13 Anylytics campaigns",
        "400 Keywords",
        "456,000 Crawled pages",
        "Unlimited Updates",
      ],
      btnColor: "bg-[#F481DF]",
      textColor: "text-[#F481DF]",
      btnText: "Upgrade",
    },
    {
      id: 2,
      type: "Advance",
      price: 79.99,
      description: "Limited marketing & growth hacks",
      details: [
        "13 Anylytics campaigns",
        "400 Keywords",
        "456,000 Crawled pages",
        "Unlimited Updates",
      ],
      btnColor: "bg-[#0088B3]",
      textColor: "text-[#0088B3]",
      btnText: "Upgrade",
    },
    {
      id: 3,
      type: "Pro",
      price: 79.99,
      description: "Limited marketing & growth hacks",
      details: [
        "13 Anylytics campaigns",
        "400 Keywords",
        "456,000 Crawled pages",
        "Unlimited Updates",
      ],
      btnColor: "bg-[#FF0084]",
      textColor: "text-[#FF0084]",
      btnText: "Upgrade",
    },
    {
      id: 4,
      type: "Ninja",
      price: 79.99,
      description: "Limited marketing & growth hacks",
      details: [
        "13 Anylytics campaigns",
        "400 Keywords",
        "456,000 Crawled pages",
        "Unlimited Updates",
      ],
      btnColor: "bg-[#9BDEAC]",
      textColor: "text-[#9BDEAC]",
      btnText: "Upgrade",
    },
  ];
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const [activeTab, setActiveTab] = useState(tab ? tab : "1");
  const [isMonthlylyBilling, setIsMonthlylyBilling] = useState(false);
  // Function to toggle between monthly and yearly billing
  const toggleBillingFrequency = () => {
    setIsYearlyBilling(!isYearlyBilling);
  };

  const { data: plans, isLoading } = useQuery(
    ["plans"],
    async () => {
      const res = await influencersApi.getPlans();
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: userPlan, isLoading: userPlanLoading } = useQuery(
    ["user-plan"],
    async () => {
      const res = await influencersApi.getUserPlan(user?.uid);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!user,
    }
  );

  // Define package details based on billing frequency
  const packages = isYearlyBilling ? isYearlyBilling : isMonthlylyBilling;

  return (
    <div className="h-full">
      <Head>
        <title>Plans & Billing</title>
      </Head>
      <div className="bg-white h-full my-4 mx-2 rounded-md fontMonst py-5 px-5">
        <div>
          {/* <h1 className="text-[24px] font-[700]">Plan & Billing</h1> */}
          <h1 className="font-[500] text-[18px]">
            Change your plan, update your billing info, and download your
            invoices
          </h1>
        </div>
        <div>
          <Tabs
            defaultActiveKey={activeTab}
            tabBarStyle={{ borderBottom: "1px solid #e8e8e8" }}
          >
            <TabPane tab="Plan" key="1">
              {userPlan === "Not found" ? (
                <Card
                  title="My Plan: Free Trial"
                  bordered={false}
                  className="bg-[#f2f0ff]"
                >
                  <span className="text-base font-bold bg-red-500 px-2 py-2 rounded-md text-white w-fit">
                    Your trial expires in&nbsp;
                    {user?.expiryDate
                      ? dayjs(user?.expiryDate?.toDate()).diff(dayjs(), "days")
                      : null}
                    &nbsp;days
                  </span>
                  <div className="rounded-md px-4 mt-5">
                    <h1 className="font-[600] text-[18px]">Trial Usage:</h1>
                    <div className="flex flex-col space-y-2">
                      <span className="text-base">
                        Influencer selection:&nbsp;
                        {user?.influencerSelection}
                      </span>
                      <span className="text-base">
                        Influencer profile analysis:&nbsp;
                        {user?.influencerProfileAnalysis}
                      </span>
                      <span className="text-base">
                        Content/post analysis:&nbsp;
                        {user?.influencerProfileAnalysis}
                      </span>
                      <span className="text-base">
                        Campaigns:&nbsp;
                        {user?.campaignUsage}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md px-4 mt-5">
                    <p className="font-[600] text-[18px] ">
                      Upgrade now to build influencer programs that get more
                      customers with less effort
                    </p>
                    <ul className=" my-3">
                      <li>✓ Find influencer worldwide</li>
                      <li>✓ Monitor Influencers</li>
                      <li>✓ Get contact details</li>
                      <li>✓ Collect posts and stories</li>
                      <li>✓ Analyze audience and demographics</li>
                      <li>✓ Measure your campaigns</li>
                      <li>✓ Check fake followers</li>
                    </ul>
                    <div>
                      <button
                        onClick={() => setActiveTab("3")}
                        className="rounded-md bg-[#6657c4] font-[500] py-2 px-3 text-white"
                      >
                        See all upgrade options
                      </button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card
                  title={
                    <div className="flex flex-col space-y-2 py-4">
                      <span className="text-lg font-bold">
                        My Plan: {userPlan?.plan}
                      </span>
                      <span className="text-green-500">
                        Subscription Date:
                        {` ${moment(userPlan?.purchaseDate).format(
                          "MMM DD, YYYY"
                        )}`}
                      </span>
                      <span className="text-red-500">
                        Expires On:
                        {` ${moment(userPlan?.expiryDate).format(
                          "MMM DD, YYYY"
                        )}`}
                      </span>
                    </div>
                  }
                  bordered={false}
                  className="bg-[#f2f0ff]"
                >
                  <div className="rounded-md">
                    <h1 className="text-lg font-bold">Plan Usage:</h1>
                    <div className="flex flex-col space-y-2">
                      <span className="text-base">
                        Influencer selection:&nbsp;
                        {user?.influencerSelection}
                      </span>
                      <span className="text-base">
                        Influencer profile analysis:&nbsp;
                        {user?.influencerProfileAnalysis}
                      </span>
                      <span className="text-base">
                        Content/post analysis:&nbsp;
                        {user?.influencerProfileAnalysis}
                      </span>
                      <span className="text-base">
                        Campaigns:&nbsp;
                        {user?.campaignUsage}
                      </span>
                    </div>
                  </div>
                </Card>
              )}
            </TabPane>
            <TabPane tab="Billing" key="2">
              <Card title="Billing Info" bordered={false}>
                <div className="flex flex-col items-center">
                  <h1 className="text-[18px] font-[600]">
                    No Billing Information to show
                  </h1>
                  <p>
                    if you{" "}
                    <Link href="#" className="text-blue-600">
                      upgrade to a paid account
                    </Link>
                    , you'll see your billing information here{" "}
                  </p>
                  <button className="rounded-md bg-[#998AF9] font-[500] py-2 px-3 text-white my-4">
                    Add Billing Information
                  </button>
                </div>
              </Card>
            </TabPane>
            <TabPane tab="Upgrade Options" key="3">
              <Card
                title="Upgrade Options"
                bordered={false}
                style={{ overflowX: "hidden" }}
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 fontMonst">
                    <span className="mr-2 font-[600]">Monthly</span>
                    <Switch
                      style={{
                        background: "gray",
                      }}
                      checked={isYearlyBilling}
                      onChange={toggleBillingFrequency}
                      size="small"
                    />
                    <span className="ml-2 font-[600]">Yearly</span>
                    <span className="text-sm ml-2">(15% discount)</span>
                  </div>
                  <div
                    className="overflow-x-auto my-4"
                    style={{ maxWidth: "100%" }}
                  >
                    {/* {status && status === "success" && (
                      <div className="bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700">
                        Payment Successful
                      </div>
                    )}
                    {status && status === "cancel" && (
                      <div className="bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700">
                        Payment Unsuccessful
                      </div>
                    )} */}
                    <div className="flex flex-row space-x-4">
                      {plans?.map((planItem) => (
                        <BillCard
                          key={planItem.id}
                          plan={planItem}
                          isYearlyBilling={isYearlyBilling}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Plan;
