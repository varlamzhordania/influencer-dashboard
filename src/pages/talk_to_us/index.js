import React from "react";
import Head from "next/head";
import ContactCard from "@/components/ContactCard";
import MeetingModal from "@/components/MeetingModal";

function Talk() {
  return (
    <div className="h-full">
      <Head>
        <title>Talk To Us</title>
      </Head>
      <div className="h-full w-full my-4 mx-2 flex justify-center items-center rounded-md fontMonst py-5 px-5">
        <ContactCard />
      </div>
    </div>
  );
}

export default Talk;
