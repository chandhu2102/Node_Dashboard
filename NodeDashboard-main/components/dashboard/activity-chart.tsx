"use client";
import data1 from "@/public/task-data.json";
import { Card } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const datas = data1.activity.monthly;

export function ActivityChart() {
 
  const chartData = {
    labels: datas.map((item) => item.month), 
    datasets: [
      {
        label: "Activity",
        data: datas.map((item) => item.value), 
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        borderColor: "rgba(75, 192, 192, 1)", 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.raw}`; // Format tooltip value
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month", // Label for the x-axis
        },
        ticks: {
          font: {
            size: 10, // Set the font size for the x-axis ticks
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Value", // Label for the y-axis
        },
        ticks: {
          font: {
            size: 10, // Set the font size for the y-axis ticks
          },
        },
      },
    },
  };

  return (
    <Card className="p-4 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-0">Activity</h3>
        <select className="text-xs sm:text-sm w-full sm:w-auto">
          <option>Month</option>
          <option>Week</option>
          <option>Day</option>
        </select>
      </div>
      <div className="h-[250px] sm:h-[300px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </Card>
  );
}
