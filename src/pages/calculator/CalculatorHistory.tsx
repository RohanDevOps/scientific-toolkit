import { Trash2, ArrowUpLeft } from 'lucide-react';

interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
  onUseEntry: (entry: HistoryEntry) => void;
}

const CalculatorHistory = ({ history, onClear, onUseEntry }: CalculatorHistoryProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">History</h2>
        <button 
          onClick={onClear}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center"
          aria-label="Clear history"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear
        </button>
      </div>
      
      {history.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-400 text-center mt-8">
          No calculations yet
        </div>
      ) : (
        <div className="space-y-3 overflow-auto flex-1">
          {history.map((entry, index) => (
            <div 
              key={index} 
              className="p-3 bg-gray-50 dark:bg-gray-750 rounded-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {entry.timestamp.toLocaleTimeString()}
                </div>
                <button
                  onClick={() => onUseEntry(entry)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  aria-label="Use this calculation"
                >
                  <ArrowUpLeft className="h-4 w-4" />
                </button>
              </div>
              <div className="text-gray-700 dark:text-gray-300 font-mono">
                {entry.expression}
              </div>
              <div className="text-lg font-semibold font-mono">
                = {entry.result}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalculatorHistory;