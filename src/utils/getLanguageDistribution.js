export default function getLanguageDistribution(data) {
  const languages = [];
  const values = [];

  data.forEach((item) => {
    languages?.push(item?.code);
    values.push(item?.value);
  });

  return { labels: languages, values };
}
