import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function AudienceHistory() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart data
    const data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Total Views',
          data: [15000, 22000, 18000, 25000, 21000, 28000],
          borderColor: '#FF5B84',
          borderWidth: 2,
          pointRadius: 0, // Hide points on the line
          fill: {
            target: 'origin',
            above: 'rgba(255, 91, 132, 0.6)', 
            below: '#D9D9D900', // Transparent color below the line
          },
        },
      ],
    };

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
     
      plugins: {
        legend: {
          display: false, 
        },
      
      },
      
      legend: {
        display: false, // Hide the legend (added directly to the options)
      },
    };
   
    const ctx = chartRef.current.getContext('2d');
    if (ctx.chart) {
      ctx.chart.destroy(); 
    }
    const newChart =  new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    ctx.chart = newChart;
    
    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col shadowDiv rounded-md py-3 px-4 lg:px-7 fontMonst lg:w-[30%]">
      <h1 className="text-[18px] font-[700]">Audience History</h1>
      <div className="w-full h-full">
        <canvas  ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default AudienceHistory;
