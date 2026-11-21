import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useExpense } from "../context/ExpenseContext.jsx";
import { getTheme } from "../data/categories.js";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { clearBudgets } = useExpense();
  const navigate = useNavigate();
  const theme = getTheme(user?.studentType);

  const handleLogout = () => {
    logout();
    clearBudgets();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between border-b border-white/10 bg-[#141824] px-4 py-3 sm:px-6">
      <Link to="/" className={`text-xl font-bold ${theme.text}`}>
        CampusKhata
      </Link>

      {user?.isSignedUp && (
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-300 sm:block">
            Hi, {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/20 px-3 py-1 text-sm text-gray-300 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}