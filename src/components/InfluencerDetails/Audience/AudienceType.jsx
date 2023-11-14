import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AudienceType = ({ graphData }) => {
  const colors = {
    mass_followers: "#B3F001",
    suspicious: "#04DB8E",
    influencers: "#D91D4A",
    real: "#680DE4",
  };
  const data = {
    // labels: ["label 1", "label 2", "label 3"],
    labels: ["mass_followers", "suspicious", "influencers", "real"],
    datasets: [
      {
        // label: "# of Votes",
        data: graphData?.map((e) => e?.value),
        backgroundColor: ["#B3F001", "#04DB8E", "#D91D4A", "#680DE4"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    borderWidth: 2,
    cutoutPercentage: 80, 
    percentageInnerCutout: 70,
    elements: {
        arc: {
            borderWidth: 18,
        },
    },
  };

  return (
    <div className="flex flex-col space-y-4">
      <span className="text-xl font-bold">Follower types</span>
      <div className="flex items-center space-x-10">
        <div className="w-92">
          <Doughnut data={data} options={options} />
        </div>
        <div className="flex items-center space-x-12">
          {graphData?.map((e) => (
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ background: colors[e?.name] }}
                ></div>
                <span className="text-lg font-bold">{Number(e?.value).toFixed(2)}%</span>
              </div>
              <span className="text-base opacity-70 capitalize">
                {e?.name === "mass_followers" ? "Mass followers" : e?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceType;
