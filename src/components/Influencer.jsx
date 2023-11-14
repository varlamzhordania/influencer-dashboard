import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail, AiOutlineYoutube } from "react-icons/ai";
import { BiLogoTiktok } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { Avatar, Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Influencer({ data, pdfRef }) {
  const [contactOpen, setContactOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (!ref?.current?.contains(e?.target)) {
      setContactOpen(false);
    }
  };

  useEffect(() => {
    document?.addEventListener("click", handleClickOutside, true);
  }, []);

  // const exportPdf = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("profile.pdf");
  //   });
  // };
  return (
    <div className="flex justify-between relative w-full space-y-4 mb-4 rounded-md py-5 px-5 fontMonst">
      <div>
        <div className="flex flex-col xs:flex-row items-center">
          <Avatar
            src={data?.profile?.image_url ? data?.profile?.image_url : ""}
            alt={`${data?.profile?.full_name}'s Profile`}
            size={150}
          />
          <div className="ml-2 flex flex-col items-center xs:items-start space-y-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg md:text-2xl font-bold">
                {data?.profile?.full_name}
              </h2>
              {data?.profile?.is_verified ? (
                <Image src="/images/verify.svg" width={24} height={24} />
              ) : null}
            </div>
            <Link
              href={data?.profile?.url}
              className="flex items-center space-x-2 text-base font-semibold w-fit capitalize hover:border-b"
              target="_blank"
            >
              <span>@{data?.profile?.platform_username}</span>
              {data?.work_platform?.name === "Instagram" ? (
                <Image src="/images/instagram.svg" width={15} height={15} />
              ) : data?.work_platform?.name === "YouTube" ? (
                <AiOutlineYoutube color={"#4254FF4F"} />
              ) : (
                <BiLogoTiktok color={"#4254FF4F"} />
              )}
            </Link>
            <p className="font-[400] text-[14px] pl-1 max-w-md">
              {data?.profile?.introduction}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center xs:justify-start space-x-8 my-5 mt-10">
          {data?.profile?.language && data?.profile?.language && (
            <div className="flex flex-col">
              <span className="text-black opacity-70 text-base">
                Language spoken
              </span>
              <span className="text-lg">
                {data?.profile?.language && data?.profile?.language === "en"
                  ? "English"
                  : data?.profile?.language}
              </span>
            </div>
          )}
          {data?.profile?.location?.country && (
            <div className="flex flex-col">
              <span className="text-black opacity-70 text-base">Location</span>
              <span className="text-lg">
                {data?.profile?.location?.country || "-"}
              </span>
            </div>
          )}

          {data?.profile?.age_group && (
            <div className="flex flex-col">
              <span className="text-black opacity-70 text-base">
                Creators age
              </span>
              <span className="text-lg">
                Between {data?.profile?.age_group} years
              </span>
            </div>
          )}
          {data?.profile?.gender && (
            <div className="flex flex-col">
              <span className="text-black opacity-70 text-base">Gender</span>
              <span className="text-lg capitalize">
                {data?.profile?.gender?.toLowerCase() || "-"}
              </span>
            </div>
          )}
          {data?.profile?.platform_account_type && (
            <div className="flex flex-col">
              <span className="text-black opacity-70 text-base">
                Account type
              </span>
              <span className="text-lg capitalize">
                {data?.profile?.platform_account_type?.toLowerCase() || "-"}
              </span>
            </div>
          )}
        </div>
      </div>
      {data?.profile?.contact_details &&
      data?.profile?.contact_details?.find((e) => e?.type === "email") ? (
        <div className="flex flex-col space-y-2 absolute top-0 right-44 w-52">
          <div
            className="cursor-pointer flex items-center space-x-1"
            onClick={() => setContactOpen(!contactOpen)}
          >
            <span className="text-base font-medium">Contact</span>
            <MdOutlineKeyboardArrowDown />
          </div>
          {contactOpen && (
            <div
              className="flex items-center space-x-8 w-fit bg-white p-2 rounded-md"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              }}
              ref={ref}
            >
              <div className="flex items-center space-x-2">
                <AiOutlineMail />
                <Link
                  href={`mailto:${
                    data?.profile?.contact_details?.find(
                      (e) => e?.type === "email"
                    )?.value
                  }`}
                  target="_blank"
                  className="text-base font-medium"
                >
                  {
                    data?.profile?.contact_details?.find(
                      (e) => e?.type === "email"
                    )?.value
                  }
                </Link>
              </div>
              <FiExternalLink />
            </div>
          )}
        </div>
      ) : null}
      {/* <Button onClick={() => exportPdf()}>Export</Button> */}
    </div>
  );
}

export default Influencer;
