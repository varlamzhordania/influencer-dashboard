// import React from 'react'
// import Influencer from '../../components/Influencer';
// import Performance from '../../components/Performance';
// import GenderPieChart from '../../components/GenderPieChart';
// import AgeGraph from '../../components/AgeGraph';
// import Head from "next/head";
// import AudienceHistory from '../../components/AudienceHistory';
// import { Table, Image } from 'antd';

// function InfluencerDetail() {
//   const data = {
//     name: "James Williams",
//     img: "/images/userImage.svg",
//     username: "Jamws-will-89",
//     bio: "Living one day at a time, with a fresh-baked cookie. Okay. And with a coffee. And maybe some...",
//     location: "United States",
//     gender: "male",
//     type: "regular",
//     socialMedia: [
//       { icon: '/images/facebook.svg', amount: 34000, bg: '#AF1FFC0F' },
//       { icon: '/images/instagram.svg', amount: 35000, bg: '#FFB30114' },
//       { icon: '/images/twitter.svg', amount: 37000, bg: '#A2D8FA29' },
//       { icon: '/images/ticktok.svg', amount: 3400, bg: '#0000000A' },
//       { icon: '/images/youtube.svg', amount: 35000, bg: '#AF1FFC0F' },
//       { icon: '/images/pinterest.svg', amount: 37000, bg: '#FF00000A' },
//     ]

//   }

//   const compaign = [
//     {
//       id: 1,
//       name: "Campaign 1",
//       socialPlatforms: ['/images/facebook.svg', '/images/instagram.svg', '/images/twitter.svg', '/images/ticktok.svg'],
//       views: "12000k",
//       successRate: 89,
//       startDate: "02 Sep 2023",
//     },
//     {
//       id: 2,
//       name: "Campaign 1",
//       socialPlatforms: ['/images/facebook.svg', '/images/instagram.svg', '/images/twitter.svg', '/images/ticktok.svg'],
//       views: "12000k",
//       successRate: 89,
//       startDate: "02 Sep 2023",
//     },
//     {
//       id: 3,
//       name: "Campaign 1",
//       socialPlatforms: ['/images/facebook.svg', '/images/instagram.svg', '/images/twitter.svg', '/images/ticktok.svg'],
//       views: "12000k",
//       successRate: 89,
//       startDate: "02 Sep 2023",
//     },
//     {
//       id: 4,
//       name: "Campaign 1",
//       socialPlatforms: ['/images/facebook.svg', '/images/instagram.svg', '/images/twitter.svg', '/images/ticktok.svg'],
//       views: "12000k",
//       successRate: 89,
//       startDate: "02 Sep 2023",
//     },
//     {
//       id: 5,
//       name: "Campaign 1",
//       socialPlatforms: ['/images/facebook.svg', '/images/instagram.svg', '/images/twitter.svg', '/images/ticktok.svg'],
//       views: "12000k",
//       successRate: 89,
//       startDate: "02 Sep 2023",
//     },
//   ]
//   const renderSocialPlatforms = (platforms) => (
//     <div className="flex space-x-2 justify-center">
//       {platforms.map((icon, index) => (
//         <Image key={index} src={icon} width={20} preview={false} style={{ marginRight: 8 }} />
//       ))}
//     </div>
//   );

//   const columns = [
//     {
//       title: (
//         <span >Campaign Name</span>
//       ),
//       dataIndex: 'name',
//       className: 'fontMonst',
//       render: (text) => <span style={{ fontWeight: 600, textAlign: 'center' }}>{text}</span>,
//     },
//     {
//       title: (
//         <span className="flex justify-center">Social Platforms</span>
//       ),
//       dataIndex: 'socialPlatforms',
//       className: 'fontMonst',
//       render: renderSocialPlatforms,
//     },
//     {
//       title: (
//         <span className="flex justify-center">Views</span>
//       ),
//       dataIndex: 'views',
//       className: 'fontMonst',
//       render: (text) => <span className="flex justify-center" style={{ fontWeight: 600, textAlign: 'center' }}>{text}</span>,
//     },
//     {
//       title: (
//         <span className="flex justify-center">Success Rate</span>
//       ),
//       dataIndex: 'successRate',
//       className: 'fontMonst',
//       render: (text) => (
//         <span className="flex justify-center" style={{ fontWeight: 600, color: '#4254FF', textAlign: 'center' }}>
//           {text}%
//         </span>
//       ),
//     },
//     {
//       title: (
//         <span className="flex justify-center">Start Date</span>
//       ),
//       dataIndex: 'startDate',
//       className: 'fontMonst',
//       render: (text) => <span className="flex justify-center" style={{ fontWeight: 600, textAlign: 'center' }}>{text}</span>,
//     },
//   ];

//   const tableStyle = {
//     border: 'none',
//     borderRadius: '16px',
//     overflowX: 'auto'
//   };
//   return (
//     <div className="h-full">
//        <Head>
//         <title>Influencer</title>
//       </Head>
//       <div className="bg-white h-full my-4 mx-2 rounded-md ">
//       <div className="px-3 w-full flex-col flex lg:flex-row">
//         <Influencer data={data}/>
//         <Performance/>
//       </div>
//       <div className=" px-4 my-4 justify-evenly flex flex-col md:flex-row ">
//         <GenderPieChart/>
//         <AgeGraph />
//         <AudienceHistory/>
//       </div>
//       <div className='px-5 py-6'>
//         <h1 className="font-[700] text-[24px] fontMonst py-3">Influencer Campaign</h1>
//         <div>
//         <div className='index-table'>
//           <Table
//             dataSource={compaign}
//             columns={columns}
//             pagination={false}
//             style={tableStyle}
//             className="fontMonst"
//           />
//         </div>
//         </div>
//       </div>
//       </div>

//     </div>
//   )
// }

// export default InfluencerDetail;
import React from "react";

const Influencer = () => {
  return <div>Influencer</div>;
};

export default Influencer;
