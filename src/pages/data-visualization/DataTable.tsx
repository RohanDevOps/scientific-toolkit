interface DataTableProps {
  data: Record<string, any>[];
  headers: string[];
}

const DataTable = ({ data, headers }: DataTableProps) => {
  if (!data.length) {
    return <div className="text-center p-4">No data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h3 className="text-lg font-semibold mb-3">Data Table</h3>
      
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-750">
              {headers.map((header) => (
                <td
                  key={`${rowIndex}-${header}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                >
                  {row[header] !== undefined ? String(row[header]) : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Statistics section */}
      <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-3">Basic Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {headers.map((header) => {
            // Only compute stats for numeric columns
            const values = data.map(row => row[header]).filter(val => typeof val === 'number');
            
            if (values.length === 0) return null;
            
            // Calculate basic statistics
            const sum = values.reduce((a, b) => a + b, 0);
            const avg = sum / values.length;
            const min = Math.min(...values);
            const max = Math.max(...values);
            
            return (
              <div key={header} className="bg-gray-50 dark:bg-gray-750 p-3 rounded">
                <h4 className="font-medium text-sm mb-2">{header}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Average:</div>
                  <div className="text-right font-mono">{avg.toFixed(2)}</div>
                  <div>Min:</div>
                  <div className="text-right font-mono">{min.toFixed(2)}</div>
                  <div>Max:</div>
                  <div className="text-right font-mono">{max.toFixed(2)}</div>
                  <div>Count:</div>
                  <div className="text-right font-mono">{values.length}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataTable;