import { Element } from './PeriodicTable';

interface ElementDetailProps {
    element: Element | null;
}

const ElementDetail = ({ element }: ElementDetailProps) => {
    if (!element) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="text-gray-500 dark:text-gray-400 text-lg">
                    Select an element to view detailed information
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                    Click on any element in the periodic table
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 overflow-y-auto h-full">
            {/* Header Section */}
            <div className="text-center mb-6">
                <div className="text-6xl font-bold mb-2" style={{ color: getCategoryColor(element.category) }}>
                    {element.symbol}
                </div>
                <h2 className="text-2xl font-bold">{element.name}</h2>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                    Atomic Number: {element.atomicNumber}
                </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InfoCard title="Basic Properties">
                    <InfoRow label="Atomic Mass" value={`${element.atomicMass} u`} />
                    <InfoRow label="Category" value={formatCategory(element.category)} />
                    <InfoRow label="Group" value={element.group} />
                    <InfoRow label="Period" value={element.period} />
                    <InfoRow label="Block" value={element.block.toUpperCase()} />
                </InfoCard>

                <InfoCard title="Physical Properties">
                    {element.density && <InfoRow label="Density" value={`${element.density} g/cm³`} />}
                    {element.electronegativity && (
                        <InfoRow label="Electronegativity" value={element.electronegativity} />
                    )}
                    {element.meltingPoint && (
                        <InfoRow label="Melting Point" value={`${element.meltingPoint} K`} />
                    )}
                    {element.boilingPoint && (
                        <InfoRow label="Boiling Point" value={`${element.boilingPoint} K`} />
                    )}
                </InfoCard>
            </div>

            {/* Electron Configuration */}
            <InfoCard title="Electron Configuration" className="mb-6">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                    <code className="text-sm font-mono">
                        {element.electronConfiguration}
                    </code>
                </div>
            </InfoCard>

            {/* Discovery Information */}
            {element.discoveredBy && (
                <InfoCard title="Discovery" className="mb-6">
                    <InfoRow label="Discovered by" value={element.discoveredBy} />
                    {element.discoveryYear && (
                        <InfoRow label="Year" value={element.discoveryYear.toString()} />
                    )}
                </InfoCard>
            )}

            {/* Description */}
            <InfoCard title="Description">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {element.description}
                </p>
            </InfoCard>

            {/* Isotopes (if available) */}
            {element.isotopes && element.isotopes.length > 0 && (
                <InfoCard title="Main Isotopes" className="mt-6">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        {element.isotopes.slice(0, 6).map((isotope) => (
                            <div key={isotope.massNumber} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                <div className="font-semibold">{element.symbol}-{isotope.massNumber}</div>
                                <div>{isotope.abundance}%</div>
                            </div>
                        ))}
                    </div>
                    {element.isotopes.length > 6 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            + {element.isotopes.length - 6} more isotopes
                        </div>
                    )}
                </InfoCard>
            )}
        </div>
    );
};

// Helper Components
const InfoCard = ({
                      title,
                      children,
                      className = ''
                  }: {
    title: string;
    children: React.ReactNode;
    className?: string
}) => (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 ${className}`}>
        <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-200">
            {title}
        </h3>
        {children}
    </div>
);

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
        <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
    </div>
);

// Helper Functions
const formatCategory = (category: string) => {
    return category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        'alkali-metal': '#ef4444',
        'alkaline-earth-metal': '#f97316',
        'transition-metal': '#eab308',
        'post-transition-metal': '#22c55e',
        'metalloid': '#14b8a6',
        'nonmetal': '#3b82f6',
        'halogen': '#0ea5e9',
        'noble-gas': '#a855f7',
        'lanthanide': '#ec4899',
        'actinide': '#6366f1',
        'unknown': '#64748b'
    };
    return colors[category] || '#64748b';
};

export default ElementDetail;