import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function DistributionGraph({ graphData, bg, title }) {
  const chartRef = useRef(null);
  useEffect(() => {
    // Dummy data for the horizontal bar chart
    const data = {
      labels: graphData?.labels,
      datasets: [
        {
          data: graphData?.values, // Dummy data values
          backgroundColor: bg, // Background color for all bars
        },
      ],
    };

    // Create the horizontal bar chart
    const ctx = chartRef.current.getContext("2d");
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true, // Start the x-axis at zero
          },
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },
      },
    });

    ctx.chart = newChart;
    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col  shadowDiv rounded-md py-3 xl:px-7 px-4 fontMonst w-full md:w-[30%] ">
      <h1 className="text-[18px] font-[700]">{title}</h1>
      <div className="w-full  h-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default DistributionGraph;
