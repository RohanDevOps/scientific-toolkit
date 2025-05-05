import { useState } from 'react';
import { evaluate } from 'mathjs';
import CalculatorKeypad from './CalculatorKeypad';
import CalculatorHistory from './CalculatorHistory';
import CalculatorDisplay from './CalculatorDisplay';

type HistoryEntry = {
  expression: string;
  result: string;
  timestamp: Date;
};

const Calculator = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleKeyPress = (key: string) => {
    switch (key) {
      case 'C':
        setInput('');
        setResult('');
        break;
      case '=':
        try {
          const calculatedResult = evaluate(input).toString();
          setResult(calculatedResult);
          addToHistory(input, calculatedResult);
        } catch (error) {
          setResult('Error');
        }
        break;
      case '←':
        setInput(input.slice(0, -1));
        break;
      default:
        setInput(input + key);
        break;
    }
  };

  const addToHistory = (expression: string, result: string) => {
    const newEntry: HistoryEntry = {
      expression,
      result,
      timestamp: new Date(),
    };
    setHistory([newEntry, ...history.slice(0, 9)]); // Keep only the last 10 entries
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryEntry = (entry: HistoryEntry) => {
    setInput(entry.expression);
    setResult(entry.result);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      <div className="lg:w-2/3 card h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Scientific Calculator</h2>
        <CalculatorDisplay input={input} result={result} />
        <CalculatorKeypad onKeyPress={handleKeyPress} />
      </div>
      <div className="lg:w-1/3 card h-full">
        <CalculatorHistory 
          history={history} 
          onClear={clearHistory} 
          onUseEntry={useHistoryEntry} 
        />
      </div>
    </div>
  );
};

export default Calculator;