import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { getTheme } from "../../data/categories.js";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    course: "",
    year: "1",
    monthlyAllowance: "",
  });
  const [error, setError] = useState("");

  if (!user?.studentType) {
    return <Navigate to="/student-type" replace />;
  }

  const theme = getTheme(user.studentType);
  const inputClass = `w-full rounded-lg border border-white/10 bg-[#0B0D14] px-3 py-2 text-white outline-none ${theme.focus}`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(form).some((value) => value.trim() === "")) {
      setError("Please fill in all the fields.");
      return;
    }
    if (Number(form.monthlyAllowance) <= 0) {
      setError("Monthly allowance must be greater than 0.");
      return;
    }

    signup(form);
    navigate("/budget-setup");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0D14] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-[#141824] p-6"
      >
        <h1 className={`text-2xl font-bold ${theme.text}`}>Create your account</h1>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">College</label>
          <input name="college" value={form.college} onChange={handleChange} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">Course</label>
            <input name="course" value={form.course} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">Year</label>
            <select name="year" value={form.year} onChange={handleChange} className={inputClass}>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5">5th Year</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-400">Monthly Allowance (₹)</label>
          <input type="number" name="monthlyAllowance" value={form.monthlyAllowance} onChange={handleChange} className={inputClass} />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className={`w-full rounded-lg py-2 font-semibold text-white ${theme.button}`}
        >
          Continue
        </button>
      </form>
    </div>
  );
}