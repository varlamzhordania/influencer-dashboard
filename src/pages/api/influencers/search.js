import { api } from "@/config/api";

export default async function handler(req, res) {
  const data = req.body;

  try {
    const response = await api.get(
      `/v1/social/creators/dictionary/userhandles?query_text=${data?.queryText}&work_platform_id=${data?.work_platform_id}&type=search&is_search=true`
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
