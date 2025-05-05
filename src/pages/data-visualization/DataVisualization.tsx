import { useState } from 'react';
import DataUploader from './DataUploader';
import ChartSelector from './ChartSelector';
import DataTable from './DataTable';

type DataRow = Record<string, string | number>;
type ChartType = 'bar' | 'line' | 'scatter' | 'pie';

const DataVisualization = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');

  const handleDataUpload = (csvData: DataRow[], csvHeaders: string[]) => {
    setData(csvData);
    setHeaders(csvHeaders);
    // Auto-select first column as X-axis and second as Y-axis if available
    if (csvHeaders.length >= 2) {
      setXAxis(csvHeaders[0]);
      setYAxis(csvHeaders[1]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="card mb-4">
        <h2 className="text-xl font-semibold mb-4">Data Upload & Visualization</h2>
        <DataUploader onDataUpload={handleDataUpload} />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        {data.length > 0 ? (
          <>
            <div className="lg:w-1/2 card">
              <ChartSelector 
                data={data}
                headers={headers}
                chartType={chartType}
                xAxis={xAxis}
                yAxis={yAxis}
                onChartTypeChange={setChartType}
                onXAxisChange={setXAxis}
                onYAxisChange={setYAxis}
              />
            </div>
            <div className="lg:w-1/2 card overflow-auto">
              <DataTable data={data} headers={headers} />
            </div>
          </>
        ) : (
          <div className="card flex-1 flex items-center justify-center">
            <div className="text-center p-8">
              <h3 className="text-xl font-semibold mb-2">No Data Available</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload a CSV file to begin visualizing your data. You can create charts, explore the data in a table, and perform basic statistical analysis.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;