export default function getAgeRangeData(data) {
  const ageRanges = []; // Array to store unique age_range values
  const ageRangeSums = {}; // Object to store sums for each age_range

  // Iterate through the data
  data.forEach((item) => {
    const { age_range, value } = item;

    // Check if the age_range is already in the array of unique age_ranges
    if (!ageRanges.includes(age_range)) {
      ageRanges.push(age_range);
      ageRangeSums[age_range] = 0;
    }

    // Add the value to the sum for the corresponding age_range
    ageRangeSums[age_range] += value;
  });

  // Convert the ageRangeSums object into an array
  const ageRangeSumArray = ageRanges.map(
    (age_range) => ageRangeSums[age_range]
  );

  return { values: ageRangeSumArray, labels: ageRanges };
}
