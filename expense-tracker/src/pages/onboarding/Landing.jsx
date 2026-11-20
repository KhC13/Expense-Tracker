import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0D14] px-4 text-center">
      <h1 className="text-4xl font-bold text-white sm:text-6xl">
        Campus<span className="text-violet-400">Khata</span>
      </h1>
      <p className="mt-4 max-w-md text-gray-400">
        A simple expense tracker made for students. Plan your monthly allowance
        and stay in control of your money.
      </p>
      <button
        onClick={() => navigate("/student-type")}
        className="mt-8 rounded-lg bg-violet-600 px-8 py-3 font-semibold text-white hover:bg-violet-500"
      >
        Get Started
      </button>
    </div>
  );
}