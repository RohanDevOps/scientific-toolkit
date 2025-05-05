import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartSelectorProps {
  data: Record<string, any>[];
  headers: string[];
  chartType: 'bar' | 'line' | 'scatter' | 'pie';
  xAxis: string;
  yAxis: string;
  onChartTypeChange: (type: 'bar' | 'line' | 'scatter' | 'pie') => void;
  onXAxisChange: (column: string) => void;
  onYAxisChange: (column: string) => void;
}

const ChartSelector = ({
  data,
  headers,
  chartType,
  xAxis,
  yAxis,
  onChartTypeChange,
  onXAxisChange,
  onYAxisChange,
}: ChartSelectorProps) => {
  // Generate chart data
  const chartData = {
    labels: data.map(row => String(row[xAxis])),
    datasets: [
      {
        label: yAxis,
        data: data.map(row => row[yAxis]),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${yAxis} vs ${xAxis}`,
      },
    },
  };

  // Generate pie chart data (if selected)
  const pieData = {
    labels: data.map(row => String(row[xAxis])).slice(0, 8), // Limit to 8 items for pie chart
    datasets: [
      {
        data: data.map(row => row[yAxis]).slice(0, 8),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={pieData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => onChartTypeChange(e.target.value as any)}
            className="input"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="scatter">Scatter Plot</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            X Axis
          </label>
          <select
            value={xAxis}
            onChange={(e) => onXAxisChange(e.target.value)}
            className="input"
          >
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Y Axis
          </label>
          <select
            value={yAxis}
            onChange={(e) => onYAxisChange(e.target.value)}
            className="input"
          >
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 min-h-[300px] relative">
        {renderChart()}
      </div>
    </div>
  );
};

export default ChartSelector;