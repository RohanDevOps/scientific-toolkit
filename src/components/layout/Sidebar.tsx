import { Calculator, AtomIcon, BarChart4, BookText, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
  onChangePage: (page: any) => void;
}

const Sidebar = ({ currentPage, onChangePage }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'periodic-table', label: 'Periodic Table', icon: AtomIcon },
    { id: 'data-visualization', label: 'Data Visualization', icon: BarChart4 },
    { id: 'notebook', label: 'Notebook', icon: BookText },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar for mobile (overlay) */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 mt-4">Scientific Toolkit</h2>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangePage(item.id);
                    if (isMobileMenuOpen) toggleMobileMenu();
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Sidebar for desktop (persistent) */}
      <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-6 mt-4">Scientific Toolkit</h2>
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangePage(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;