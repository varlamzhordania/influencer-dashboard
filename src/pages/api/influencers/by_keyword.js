import { api } from "@/config/api";

export default async function handler(req, res) {
  const data = req.body;
  try {
    const response = await api.post(`/v1/social/creators/profiles/search`, {
      ...data,
      sort_by: { field: "AVERAGE_LIKES", order: "DESCENDING" },
      limit: 50,
    });

    res.status(200).json(response.data);
  } catch (error) {
    // console.error("Error creator search:", error);
    if (error?.response?.status === 404) {
      res.status(200).json([]);
    } else {
      res.status(500).json({
        error: "An error occurred while fetching data from the API.",
        message: error,
      });
    }
  }
}
