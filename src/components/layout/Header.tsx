import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold capitalize">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;