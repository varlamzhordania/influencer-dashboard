export default function getCountryDistribution(data) {
  const countries = [];
  const values = [];

  data.forEach((item) => {
    countries?.push(item?.code);
    values.push(item?.value);
  });

  return { labels: countries, values };
}
