import formatNumber from "./formatNumber";

export default function getTotalEngagement(data) {
  let totalEngagement = 0;
  if (data?.like_count) {
    totalEngagement += data?.like_count;
  }
  if (data?.comment_count) {
    totalEngagement += data?.comment_count;
  }

  if (data?.share_count) {
    totalEngagement += data?.share_count;
  }
  if (data?.view_count) {
    totalEngagement += data?.view_count;
  }

  totalEngagement = formatNumber(totalEngagement);

  return totalEngagement
}
