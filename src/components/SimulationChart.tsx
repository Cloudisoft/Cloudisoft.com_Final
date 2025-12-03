import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function SimulationChart({ data }: any) {
  const months = Array.from({ length: data.months }, (_, i) => i + 1);

  const dataset = {
    labels: months,
    datasets: [
      {
        label: "Optimistic",
        data: data.optimisticSeries,
        borderColor: "#10b981",
        tension: 0.3,
      },
      {
        label: "Expected",
        data: data.expectedSeries,
        borderColor: "#f59e0b",
        tension: 0.3,
      },
      {
        label: "Cautious",
        data: data.cautiousSeries,
        borderColor: "#ef4444",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-cloudi-card/70 rounded-2xl p-4">
      <Line data={dataset} />
    </div>
  );
}
