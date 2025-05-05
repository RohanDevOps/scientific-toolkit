import type { Element } from './PeriodicTable';

interface ElementGridProps {
    elements: Element[];
    selectedElement: Element | null;
    onSelectElement: (element: Element) => void;
}

const categoryColors: Record<string, string> = {
    'alkali-metal': 'bg-red-200 dark:bg-red-900',
    'alkaline-earth-metal': 'bg-orange-200 dark:bg-orange-900',
    'transition-metal': 'bg-yellow-200 dark:bg-yellow-900',
    'post-transition-metal': 'bg-green-200 dark:bg-green-900',
    'metalloid': 'bg-teal-200 dark:bg-teal-900',
    'nonmetal': 'bg-blue-200 dark:bg-blue-900',
    'halogen': 'bg-blue-300 dark:bg-blue-800',
    'noble-gas': 'bg-purple-200 dark:bg-purple-900',
    'lanthanide': 'bg-pink-200 dark:bg-pink-900',
    'actinide': 'bg-indigo-200 dark:bg-indigo-900',
    'unknown': 'bg-gray-200 dark:bg-gray-700',
};

const ElementGrid = ({ elements, selectedElement, onSelectElement }: ElementGridProps) => {
    if (!elements.length) {
        return <div className="text-center py-10 text-gray-500">No elements found.</div>;
    }

    const grid = Array(10).fill(null).map(() => Array(18).fill(null));

    elements.forEach(element => {
        const { atomicNumber, category, period, group } = element;

        if (category.includes('lanthanide')) {
            const index = atomicNumber - 57;
            if (index >= 0 && index < 15) grid[7][index + 3] = element;
        } else if (category.includes('actinide')) {
            const index = atomicNumber - 89;
            if (index >= 0 && index < 15) grid[8][index + 3] = element;
        } else if (period > 0 && period <= 7 && group > 0 && group <= 18) {
            grid[period - 1][group - 1] = element;
        }
    });

    return (
        <div className="periodic-table w-full overflow-auto">
            <div className="relative w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-18 gap-1 mb-4">
                    {grid.slice(0, 7).map((row, rowIndex) =>
                        row.map((element, colIndex) => (
                            <ElementCell
                                key={`main-${rowIndex}-${colIndex}`}
                                element={element}
                                selectedElement={selectedElement}
                                onSelectElement={onSelectElement}
                            />
                        ))
                    )}
                </div>
                <div className="h-4"></div>
                <div className="grid grid-cols-18 gap-1 mb-1">
                    <div className="col-span-3 flex items-center justify-end pr-2 text-xs">*Lanthanides</div>
                    {grid[7].slice(3, 18).map((element, colIndex) => (
                        <ElementCell
                            key={`lanth-${colIndex}`}
                            element={element}
                            selectedElement={selectedElement}
                            onSelectElement={onSelectElement}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-18 gap-1">
                    <div className="col-span-3 flex items-center justify-end pr-2 text-xs">**Actinides</div>
                    {grid[8].slice(3, 18).map((element, colIndex) => (
                        <ElementCell
                            key={`actin-${colIndex}`}
                            element={element}
                            selectedElement={selectedElement}
                            onSelectElement={onSelectElement}
                        />
                    ))}
                </div>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                    {Object.entries(categoryColors).map(([category, color]) => (
                        <div key={category} className="flex items-center">
                            <div className={`w-4 h-4 rounded ${color} mr-2`} />
                            <span className="text-xs capitalize">{category.replace(/-/g, ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface ElementCellProps {
    element: Element | null;
    selectedElement: Element | null;
    onSelectElement: (element: Element) => void;
}

const ElementCell = ({ element, selectedElement, onSelectElement }: ElementCellProps) => {
    if (!element) return <div className="w-12 h-12" aria-hidden="true" />;

    const normalizedCategory = element.category.replace(/\s/g, '-').toLowerCase();

    return (
        <button
            onClick={() => onSelectElement(element)}
            className={`w-12 h-12 p-1 rounded border flex flex-col items-center justify-center text-center transition-all
        ${categoryColors[normalizedCategory] || categoryColors['unknown']}
        ${selectedElement?.atomicNumber === element.atomicNumber
                ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105 z-10'
                : 'hover:scale-105'
            }`}
            title={`${element.name} (${element.symbol}) - Atomic No: ${element.atomicNumber}`}
        >
            <div className="text-xs font-medium">{element.atomicNumber}</div>
            <div className="text-base font-bold">{element.symbol}</div>
            <div className="text-[9px] truncate w-full">{element.name}</div>
        </button>
    );
};

export default ElementGrid;
