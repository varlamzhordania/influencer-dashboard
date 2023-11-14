import { api } from "@/config/api";

export default async function handler(req, res) {
  const data = req.body;

  try {
    const response = await api.post(
      "/v1/social/creators/profiles/analytics",
      {
        identifier: data?.identifier,
        work_platform_id: data?.work_platform_id,
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}
