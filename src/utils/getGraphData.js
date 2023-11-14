import moment from "moment";

export default function getGraphData(data) {
  const monthArray = [];
  const followerCountArray = [];
  const subscriberCountArray = [];
  const averageLikesArray = [];
  const averageViewsArray = [];
  const averageCommentsArray = [];

  data?.forEach((item) => {
    const formattedMonth = moment(item.month, "YYYY-MM").format("MMM YYYY");
    monthArray.push(formattedMonth);
    followerCountArray.push(item.follower_count);
    subscriberCountArray.push(item.subscriber_count);
    averageLikesArray.push(item.average_likes);
    averageViewsArray.push(item.average_views);
    averageCommentsArray.push(item.average_comments);
  });

  return {
    month: monthArray,
    follower_count: followerCountArray,
    subscriber_count: subscriberCountArray,
    average_likes: averageLikesArray,
    average_views: averageViewsArray,
    average_comments: averageCommentsArray,
  };
}
