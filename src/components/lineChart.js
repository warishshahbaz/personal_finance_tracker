import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top",
    },
    plugins: {
      legend: {
        display: true,
        boxWidth: 3,
        boxHeight: 3,
        position: "bottom",
        labels: {
          font: {
            family: "Poppins, sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        boxWidth: 8,
        boxHeight: 1,
        callbacks: {
          label: (context) => {
            const { data, label } = context?.dataset;
            return `${label ?? ""}:  `;
          },
        },
      },
    },
    title: {
      display: true,
      text: "Income / Expense Graph",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export function LineChart({ incomeData, expenseData }) {
  const income = incomeData.map((val) => val?.value ?? 0);
  const expense = expenseData.map((val) => val?.value ?? 0);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Income",
        data: income,
        borderColor: "#BAE3E2",
        backgroundColor: "#C2DAD9",
      },
      {
        fill: true,
        label: "Expense",
        data: expense,
        borderColor: "#E267B7",
        backgroundColor: "#DB9ADC",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
