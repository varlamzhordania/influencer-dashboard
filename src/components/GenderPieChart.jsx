import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function GenderPieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Data
    const graphData = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [data?.male, data?.female],
          backgroundColor: ["#FF5B84", "#1198F6"],
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "pie",
      data: graphData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              textAlign: "center",
            },
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
    <div className="">
      {/* <h1 className="text-[18px] font-[700]">Followed by Gender</h1> */}
      <div className="w-full flex justify-center h-[400px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default GenderPieChart;
