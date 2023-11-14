import Loader from "@/components/Loader";
import influencersApi from "@/lib/influencers";
import paymentApi from "@/lib/payment";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";

const Transaction = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { status, session_id } = router.query;

  const updatePaymentStatus = async () => {
    await paymentApi.updatePaymentStatus(session_id);
  };

  const { data, isLoading } = useQuery(
    ["user-plan"],
    async () => {
      const res = await influencersApi.getUserPlan(user?.uid);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!user || !!status || !!session_id,
    }
  );

  useEffect(() => {
    if (status && session_id) {
      if (status === "success") {
        updatePaymentStatus();
      }
    }
  }, [status]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Influence</title>
      </Head>
      <div className="w-screen h-screen flex flex-col space-y-4 items-center justify-center bg-[#E5EFF8]">
        <span className="text-2xl font-bold">
          {status === "success" ? "Payment Successful!" : "Payment Failed!"}
        </span>
        {status === "success" ? (
          <BsFillCheckCircleFill
            className="text-green-500 rounded-full"
            size={60}
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          />
        ) : (
          <AiFillCloseCircle
            className="text-red-500 rounded-full"
            size={60}
            style={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          />
        )}
        {status === "success" ? (
          <>
            <Link
              href={"/"}
              className="text-blue-500 hover:text-blue-500 border-b border-b-blue-500 font-bold"
            >
              Explore now
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/"}
              className="text-blue-500 hover:text-blue-500 border-b border-b-blue-500 font-bold"
            >
              Go home
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Transaction;
