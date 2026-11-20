import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { studentTypes } from "../../data/categories.js";

export default function StudentType() {
  const navigate = useNavigate();
  const { selectStudentType } = useAuth();

  const handleSelect = (type) => {
    selectStudentType(type);
    navigate("/signup");
  };

  const dayScholar = studentTypes.dayScholar;
  const hosteller = studentTypes.hosteller;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D14] px-4">
      <h1 className="text-3xl font-bold text-white">Who are you?</h1>
      <p className="mt-2 text-gray-400">Choose your student type to continue.</p>

      <div className="mt-8 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        <button
          onClick={() => handleSelect("dayScholar")}
          className={`rounded-xl border border-white/10 bg-[#141824] p-6 text-left transition hover:${dayScholar.border} hover:border-violet-500`}
        >
          <h2 className={`text-xl font-semibold ${dayScholar.text}`}>
            {dayScholar.label}
          </h2>
          <p className="mt-2 text-sm text-gray-400">{dayScholar.description}</p>
        </button>

        <button
          onClick={() => handleSelect("hosteller")}
          className="rounded-xl border border-white/10 bg-[#141824] p-6 text-left transition hover:border-emerald-500"
        >
          <h2 className={`text-xl font-semibold ${hosteller.text}`}>
            {hosteller.label}
          </h2>
          <p className="mt-2 text-sm text-gray-400">{hosteller.description}</p>
        </button>
      </div>
    </div>
  );
}