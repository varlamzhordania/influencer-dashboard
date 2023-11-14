import { api } from "@/config/api";

export default async function handler(req, res) {
  const { queryText, work_platform_id } = req.body;
  try {
    const response = await api.get(
      `/v1/social/creators/dictionary/topics?identifier=${queryText}&work_platform_id=${work_platform_id}&limit=50`
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
