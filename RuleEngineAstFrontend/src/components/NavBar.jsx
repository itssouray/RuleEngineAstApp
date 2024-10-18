import { Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const Navbar = ({
  onOpenRuleDialog,
  onOpenUserInputDialog,
  onOpenCombineDialog,
}) => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto p-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Rule Engine</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-gray-400 hover:text-white"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Links (Visible on larger screens) */}
        <div className="hidden md:flex space-x-4 items-center">
          <button onClick={onOpenRuleDialog} className="hover:text-gray-400">
            Create Rule
          </button>
          <button
            onClick={onOpenUserInputDialog}
            className="hover:text-gray-400"
          >
            Evaluate Rule
          </button>
          <Link onClick={onOpenCombineDialog} className="hover:text-gray-400">
            Combine Rule
          </Link>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
          >
            {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Visible on small screens when toggled) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col items-center space-y-2 p-4">
            <button
              onClick={() => {
                onOpenRuleDialog();
                toggleMobileMenu();
              }}
              className="hover:text-gray-400"
            >
              Create Rule
            </button>
            <button
              onClick={() => {
                onOpenUserInputDialog();
                toggleMobileMenu();
              }}
              className="hover:text-gray-400"
            >
              Evaluate Rule
            </button>
            <Link
              to="/rules"
              className="hover:text-gray-400"
              onClick={toggleMobileMenu}
            >
              Rules List
            </Link>
            <Link onClick={onOpenCombineDialog} className="hover:text-gray-400">
              Combine Rule
            </Link>
            <button
              onClick={() => {
                toggleTheme();
                toggleMobileMenu();
              }}
              className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600 focus:outline-none"
            >
              {theme === "dark" ? <MdOutlineLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
