import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_OAUTH2_CLIENT_ID,
  process.env.NEXT_PUBLIC_OAUTH2_CLIENT_SECRET,
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/schedule"
    : "https://infulent.io/schedule"
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

export default async function handler(req, res) {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    res.status(200).json(url);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Google api error.",
      message: error,
    });
  }
}
