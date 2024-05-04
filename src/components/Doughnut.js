import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughtnutChart({ Expense_value, current_value, Total_value }) {
  const data = {
    labels: ["Total Income", "Income", "Expense"],
    datasets: [
      {
        label: "# of Votes",
        data: [Total_value ?? 0, current_value ?? 0, Expense_value ?? 0],
        backgroundColor: ["#9CDCE7", "#96D2AF", "#E28EC4"],
        borderColor: ["rgba(54, 162, 235, 1)", "#55E4A7", "#E267B7"],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}
