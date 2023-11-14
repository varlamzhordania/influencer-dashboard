import formatNumber from "@/utils/formatNumber";
import React from "react";
import { Line } from "react-chartjs-2";

const GrowthGraph = ({ data }) => {
  const options = {
    scales: {
      // x: {
      //   display: false, // Hide x-axis
      // },
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: (value) => formatNumber(value),
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };
  return (
    <div className="h-72">
      <Line data={data} options={options} />
    </div>
  );
};

export default GrowthGraph;
