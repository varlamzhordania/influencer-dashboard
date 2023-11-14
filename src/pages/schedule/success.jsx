import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ScheduleSuccess = () => {
  const router = useRouter();
  const { event } = router.query;
  return (
    <>
      <Head>
        <title>Schedule meet</title>
      </Head>
      <div className="flex items-center justify-center flex-col h-96 space-y-6 w-full">
        <BsFillCheckCircleFill
          className="text-green-500 rounded-full"
          size={60}
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        />
        <span className="text-xl font-bold">
          Meeting Scheduled Successfully!
        </span>
        <span className="text-base text-center max-w-sm">
          Click&nbsp;
          <Link
            className="text-blue-500 hover:text-blue-500"
            href={event}
            target="_blank"
          >
            here
          </Link>
          &nbsp;to see meeting on google calendar.
        </span>
      </div>
    </>
  );
};

export default ScheduleSuccess;
