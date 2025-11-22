import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-2xl font-bold">Healthcare Portal</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition font-medium">
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-200 transition font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              className="hover:text-blue-200 transition font-medium"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-200 transition font-medium"
            >
              Contact
            </Link>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-blue-400">
              <Link to="/login">
                <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition font-medium">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition font-medium">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
