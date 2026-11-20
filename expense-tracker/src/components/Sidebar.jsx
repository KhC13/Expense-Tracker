import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getTheme, studentTypes } from "../data/categories.js";

export default function Sidebar() {
  const { user } = useAuth();
  const theme = getTheme(user?.studentType);
  const typeInfo =
    user?.studentType === "hosteller" ? studentTypes.hosteller : studentTypes.dayScholar;

  return (
    <aside className="w-full border-b border-white/10 bg-[#141824] p-5 md:min-h-[calc(100vh-57px)] md:w-64 md:border-b-0 md:border-r">
      <p className={`text-xs font-semibold uppercase tracking-wide ${theme.text}`}>
        {typeInfo.label}
      </p>
      <h2 className="mt-1 text-lg font-semibold text-white">{user?.name}</h2>

      <div className="mt-4 space-y-1 text-sm text-gray-400">
        <p>{user?.email}</p>
        <p>{user?.college}</p>
        <p>
          {user?.course} · Year {user?.year}
        </p>
      </div>

      <Link
        to="/budget-setup"
        className={`mt-6 block rounded-lg px-4 py-2 text-center text-sm font-medium text-white ${theme.button}`}
      >
        Edit Budget
      </Link>
    </aside>
  );
}