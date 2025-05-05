import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Calculator from './pages/calculator/Calculator';
import PeriodicTable from './pages/periodic-table/PeriodicTable';
import DataVisualization from './pages/data-visualization/DataVisualization';
import Notebook from './pages/notebook/Notebook';
import { ThemeProvider } from './context/ThemeContext';

// Define the available pages
type Page = 'calculator' | 'periodic-table' | 'data-visualization' | 'notebook';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('calculator');

  // Render the current selected page
  const renderPage = () => {
    switch (currentPage) {
      case 'calculator':
        return <Calculator />;
      case 'periodic-table':
        return <PeriodicTable />;
      case 'data-visualization':
        return <DataVisualization />;
      case 'notebook':
        return <Notebook />;
      default:
        return <Calculator />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Sidebar currentPage={currentPage} onChangePage={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={currentPage.replace('-', ' ')} />
          <main className="flex-1 overflow-auto p-4">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;