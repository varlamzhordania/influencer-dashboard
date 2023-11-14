import { api } from "@/config/api";

export default async function handler(req, res) {
  const data = req.body;

  try {
    let creator_locations = [];
    if (data?.creator_locations) {
      creator_locations = data?.creator_locations?.map((e) => e?.location_id);
      data["creator_locations"] = creator_locations;
    }
    const response = await api.post(`/v1/social/creators/profiles/search`, {
      ...data,
      // creator_locations: ["a103500f-9270-4551-88fa-1aad977f454a"],
      sort_by: { field: "AVERAGE_LIKES", order: "DESCENDING" },
      limit: 50,
      // offset: 0,
    });

    res.status(200).json(response.data);
  } catch (error) {
    // console.error("Error creator search:", error);
    if (error?.response?.status === 404) {
      console.error("If running:");

      res.status(200).json([]);
    } else {
      res.status(500).json({
        error: "An error occurred while fetching data from the API.",
        message: error,
      });
    }
  }
}
