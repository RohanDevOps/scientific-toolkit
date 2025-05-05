import { useState, useMemo } from 'react';
import ElementGrid from './ElementGrid';
import ElementDetail from './ElementDetail';
import { elements } from './periodicTableData';

export type Element = {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  group: number;
  period: number;
  block: string;
  electronConfiguration: string;
  shells: number[];
  neutrons: number;
  electronegativity?: number;
  density?: number;
  meltingPoint?: number;
  boilingPoint?: number;
  discoveredBy?: string;
  discoveryYear?: number;
  description: string;
  isotopes: { massNumber: number; abundance: number }[];
};

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredElements = useMemo(() => {
    if (!searchQuery.trim()) return elements;

    const query = searchQuery.toLowerCase();
    return elements.filter(
        (element) =>
            element.name.toLowerCase().includes(query) ||
            element.symbol.toLowerCase().includes(query) ||
            element.atomicNumber.toString().includes(query) ||
            element.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectElement = (element: Element) => {
    setSelectedElement(element);
    if (window.innerWidth < 1024) {
      document.getElementById('element-detail')?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const clearSelection = () => {
    setSelectedElement(null);
    setSearchQuery('');
  };

  return (
      <div className="flex flex-col h-full gap-4 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="relative flex-1">
            <input
                type="text"
                placeholder="Search by name, symbol, number or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
            {searchQuery && (
                <button
                    onClick={clearSelection}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Clear search"
                >
                  ❌
                </button>
            )}
          </div>
          {selectedElement && (
              <button
                  onClick={clearSelection}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors lg:hidden"
              >
                Clear Selection
              </button>
          )}
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-4 flex-1">
          <div className="lg:w-3/4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto p-2">
            <ElementGrid
                elements={filteredElements}
                selectedElement={selectedElement}
                onSelectElement={handleSelectElement}
            />
          </div>
          <div id="element-detail" className="lg:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-auto p-4">
            <ElementDetail element={selectedElement} />
          </div>
        </div>
      </div>
  );
};

export default PeriodicTable;
