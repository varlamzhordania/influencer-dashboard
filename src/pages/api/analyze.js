import { api } from "@/config/api";

export default async function handler(req, res) {
  const data = req.body;
  try {
    const response = await api.post("/v1/social/creators/contents/fetch", {
      ...data,
    });
    if (response.data?.data?.length > 0) {
      res.status(200).json(response.data?.data[0]);
    } else {
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while fetching data from the API.",
      message: error,
    });
  }
}
