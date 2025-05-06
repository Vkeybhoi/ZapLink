import { useTheme } from "../context/ThemeContext";

function NavBar() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="static top-0 z-20 bg-[repeating-linear-gradient(0deg, #f5f5f5, #f5f5f5 15px, #e5e5e5 15px, #d4d4d4 30px)] dark:bg-[repeating-linear-gradient(0deg, #ffffff, #ffffff 15px, #f0f0f0 15px, #e0e0e0 30px)] border-b border-gray-300 dark:border-gray-500 shadow-sm py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Styled Logo */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-300 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 animate-pulse">
          Zap<span className="text-gray-800 dark:text-gray-100">Link</span>
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="px-6 py-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Toggle theme"
          >
            {isDarkMode ? "☀️ Zap Mode" : "🌙 Zip Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
