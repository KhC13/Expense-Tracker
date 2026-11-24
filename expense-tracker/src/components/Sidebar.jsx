
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getTheme, studentTypes } from "../data/categories.js";

export default function Sidebar() {
  const { user } = useAuth();
  const theme = getTheme(user?.studentType);

  const typeInfo =
    user?.studentType === "hosteller"
      ? studentTypes.hosteller
      : studentTypes.dayScholar;

  return (
    <aside className="w-full border-b border-white/10 bg-[#141824] p-5 md:min-h-[calc(100vh-57px)] md:w-64 md:border-b-0 md:border-r">

      <p className={`text-xs font-semibold uppercase tracking-wide ${theme.text}`}>
        {typeInfo.label}
      </p>

      <h2 className="mt-1 text-lg font-semibold text-white">
        {user?.name}
      </h2>

      <div className="mt-4 space-y-1 text-sm text-gray-400">
        <p>{user?.email}</p>
        <p>{user?.college}</p>
        <p>
          {user?.course} · Year {user?.year}
        </p>
      </div>

      <div className="mt-6 space-y-2">

        <Link
          to="/budget-setup"
          className={`block rounded-lg px-4 py-2 text-center text-sm font-medium text-white ${theme.button}`}
        >
          Edit Budget
        </Link>

        <Link
          to="/add-expense"
          className="block rounded-lg bg-[#252B3A] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#343C50]"
        >
          Add Expense
        </Link>
        <Link
          to="/transactions"
          className="block rounded-lg bg-[#252B3A] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#343C50]"
        >
          Transactions
        </Link>
        <Link
          to="/budget-management"
          className="mt-2 block rounded-lg px-4 py-2 text-center text-sm font-medium text-white bg-white/10 hover:bg-white/20"
        >
          Budget Management
        </Link>
        <Link
          to="/categories"
          className="mt-2 block rounded-lg bg-[#252B3A] px-4 py-2 text-center text-sm font-medium text-white hover:bg-[#343B4D]"
        >
          Categories
        </Link>
      </div>
    </aside>
  );
}
