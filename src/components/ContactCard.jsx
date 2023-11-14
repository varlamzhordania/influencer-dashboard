import React, { useState } from "react";
import Image from "next/image";
import MeetingModal from "./MeetingModal";
import axios from "axios";
import { useRouter } from "next/router";

function ContactCard() {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const queryParams = router.query

  const handleClick = async () => {
    const res = await axios.get("/api/google");
    router.push(res.data);
  };
  
  return (
    <div className="bg-white py-6 md:px-8 px-5 shadow-form rounded-md">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:items-center">
        <div className=" h-[100px] w-[100px] rounded-full flex justify-center bg-[#AF1FFC] mr-4">
          <Image src="/images/talk.svg" width={50} height={50} />
        </div>
        <div>
          <h1 className="font-[600] text-[24px]">Talk to us</h1>
          <p className="text-[18px]">
            For any help, issues, demos, or production access
          </p>
        </div>
      </div>
      <div className="flex space-x-6 w-full my-4 sm:px-4">
        <button className="bg-[#4254FF42] text-sm sm:text-[18px] rounded-md sm:w-[50%] p-2  sm:p-3 text-[#4254FF] flex items-center justify-center">
          <Image
            src="/images/email.svg"
            width={20}
            height={20}
            className="mr-3"
          />
          Email us
        </button>
        <button
          className="gradient-bg rounded-md text-[18px] sm:w-[50%] p-3 flex items-center justify-center"
          onClick={() => handleClick()}
        >
          <Image
            src="/images/call.svg"
            width={20}
            height={20}
            className="mr-3"
          />
          Schedule a call
        </button>
      </div>
      <MeetingModal
        visible={modal}
        onCancel={() => setModal(false)}
        // onSave={handleEditSave}
        // initialValues={editFormData}
      />
    </div>
  );
}

export default ContactCard;
