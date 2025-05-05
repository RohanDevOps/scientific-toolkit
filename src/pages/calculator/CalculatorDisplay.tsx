interface CalculatorDisplayProps {
  input: string;
  result: string;
}

const CalculatorDisplay = ({ input, result }: CalculatorDisplayProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
      <div className="font-mono text-lg text-gray-600 dark:text-gray-300 min-h-6 text-right">
        {input || '0'}
      </div>
      <div className="font-mono text-3xl font-semibold text-right mt-2 break-all">
        {result || '0'}
      </div>
    </div>
  );
};

export default CalculatorDisplay;