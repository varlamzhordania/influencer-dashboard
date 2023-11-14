// import axios from "axios";

// export default async function handler(req, res) {
//   const id = "45291df8-c38a-4f00-83b5-d60347086995"; // Replace with the actual ID you want to fetch
//   const accessToken =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDUyOTFkZjgtYzM4YS00ZjAwLTgzYjUtZDYwMzQ3MDg2OTk1IiwidGVuYW50X2lkIjoiNGRiZjI1ZDUtZWMwNi00OWZhLWI1NTgtNTdhNmI5NTkyY2IxIiwidGVuYW50X2FwcF9pZCI6ImU4ZjdmNzE2LTY1ZGItNDczNS1hZjFlLWY0ZGI2ZDVhNDcwZCIsInByb2R1Y3RzIjpbIkVOR0FHRU1FTlRfQVVESUVOQ0UiLCJBQ1RJVklUWSIsIklOQ09NRSIsIklERU5USVRZX0FVRElFTkNFIiwiRU5HQUdFTUVOVCIsIklERU5USVRZIl0sImlzcyI6Imh0dHBzOi8vYXBpLnNhbmRib3guZ2V0cGh5bGxvLmNvbSIsImF1ZCI6Imh0dHBzOi8vYXBpLnNhbmRib3guZ2V0cGh5bGxvLmNvbS92MS9pbnRlcm5hbCIsImlhdCI6MTY5NDc3MjQ5OC4zNDk4MzksImV4cCI6MTY5NTM3NzI5OC4zNDk4MzJ9.OHooqnLnHXZXsEe9z42Oz_IF2pnnUVjS6QsrpMt0ZmM"; // Replace with your actual access token

//   try {
//     const response = await axios.get(
//       `https://api.sandbox.insightiq.ai/v1/campaign-management/campaigns?sort_by=CREATED_AT&sort_desc=true&limit=10&offset=0`,
//       {
//         auth: {
//           username: "e8f7f716-65db-4735-af1e-f4db6d5a470d",
//           password: "41605172-1b39-47d6-a25f-c6958c3bdd3a",
//         },
//         headers: {
//           Accept: "application/json",
//           Authorization: `Basic ${accessToken}`,
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({
//       error: "An error occurred while fetching data from the API.",
//       message: error?.response?.data,
//     });
//   }
// }

// import { getOptions } from "puppeteer";
import puppeteer from "puppeteer";

export default async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Next.js page you want to export as a PDF.
  await page.goto(
    `http://localhost:3001/influencer-details?identifier=instagram&work_platform_id=9bb8913b-ddd9-430b-a66a-d74d846e6c66`,
    { waitUntil: "networkidle0" }
  );

  // Generate a PDF of the page and save it to a file.
  const pdfBuffer = await page.pdf();

  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="exported.pdf"');
  res.status(200).send(pdfBuffer);
};


