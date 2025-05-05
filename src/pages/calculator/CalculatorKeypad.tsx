interface CalculatorKeypadProps {
  onKeyPress: (key: string) => void;
}

const CalculatorKeypad = ({ onKeyPress }: CalculatorKeypadProps) => {
  const keys = [
    ['(', ')', '%', 'C'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['sin', 'cos', 'tan', '←'],
    ['log', 'ln', 'π', '^'],
    ['√', '!', 'e', '|'],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mt-auto">
      {keys.map((row, rowIndex) => (
        row.map((key, keyIndex) => (
          <button
            key={`${rowIndex}-${keyIndex}`}
            onClick={() => onKeyPress(key)}
            className={`
              py-3 rounded-lg font-medium transition-colors
              ${key === '=' 
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : ['C', '←'].includes(key)
                  ? 'bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-100'
                  : ['sin', 'cos', 'tan', 'log', 'ln', '√', '!', '^', '%', 'π', 'e', '|'].includes(key)
                    ? 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 dark:text-purple-100'
                    : ['+', '-', '*', '/'].includes(key)
                      ? 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-900 dark:hover:bg-amber-800 dark:text-amber-100'
                      : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
              }
            `}
          >
            {key}
          </button>
        ))
      ))}
    </div>
  );
};

export default CalculatorKeypad;