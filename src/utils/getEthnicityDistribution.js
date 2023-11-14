export default function getEthnicityDistribution(data) {
  const ethnicity = [];
  const values = [];

  data.forEach((item) => {
    ethnicity?.push(item?.name);
    values.push(item?.value);
  });

  return { labels: ethnicity, values };
}
