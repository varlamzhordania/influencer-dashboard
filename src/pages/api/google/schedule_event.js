import axios from "axios";
import dayjs from "dayjs";
import { google } from "googleapis";
import { uuid } from "uuidv4";

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_OAUTH2_CLIENT_ID,
  process.env.NEXT_PUBLIC_OAUTH2_CLIENT_SECRET,
  "http://localhost:3001/schedule"
  //   process.env.NEXT_PUBLIC_OAUTH2_REDIRECT_URL
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const calendar = google.calendar({
  version: "v3",
  auth: "AIzaSyAp4-CHH9CRb4fBjoUTP4TKAlN051Vwp98",
});

export default async function handler(req, res) {
  const { event, code } = req.body;
  try {
    // const eventData = {
    //   summary: event?.title,
    //   description: event?.description,
    //   start: {
    //     dateTime: event?.startTime,
    //     timeZone: "UTC", // Update with your timezone
    //   },
    //   end: {
    //     dateTime: event?.endTime,
    //     timeZone: "UTC", // Update with your timezone
    //   },
    // };
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const created = await calendar.events.insert({
      auth: oauth2Client,
      calendarId: "primary", // Use "primary" for the user's primary calendar
      conferenceDataVersion: 1,
      sendNotifications: true,
      requestBody: {
        summary: event?.summary,
        description: event?.description,
        start: {
          dateTime: dayjs(new Date(event?.start)).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: dayjs(new Date(event?.end)).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        conferenceData: {
          createRequest: {
            requestId: uuid(),
          },
        },
        attendees: [
          {
            email: "admin@infulent.ca",
          },
          {
            email: "awaisnazarofficial@gmail.com",
          },
        ],
      },
    });

    res
      .status(200)
      .json({ isSuccess: true, eventLink: created?.data.htmlLink });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Google api error.",
      message: error,
    });
  }
}
