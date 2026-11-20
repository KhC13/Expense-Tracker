export const dayScholarCategories = [
  { id: "transport", name: "Transport", percent: 20 },
  { id: "food", name: "Food", percent: 30 },
  { id: "college", name: "College", percent: 20 },
  { id: "entertainment", name: "Entertainment", percent: 10 },
  { id: "shopping", name: "Shopping", percent: 10 },
  { id: "miscellaneous", name: "Miscellaneous", percent: 10 },
];

export const hostellerCategories = [
  { id: "messFood", name: "Mess & Food", percent: 30 },
  { id: "hostelEssentials", name: "Hostel Essentials", percent: 20 },
  { id: "college", name: "College", percent: 20 },
  { id: "entertainment", name: "Entertainment", percent: 10 },
  { id: "shopping", name: "Shopping", percent: 10 },
  { id: "miscellaneous", name: "Miscellaneous", percent: 10 },
];

export const studentTypes = {
  dayScholar: {
    id: "dayScholar",
    label: "Day Scholar",
    description: "You live at home and travel to college every day.",
    text: "text-violet-400",
    button: "bg-violet-600 hover:bg-violet-500",
    border: "border-violet-500",
    focus: "focus:border-violet-500",
    soft: "bg-violet-500/10",
  },
  hosteller: {
    id: "hosteller",
    label: "Hosteller",
    description: "You live in a hostel or PG near your college.",
    text: "text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-500",
    border: "border-emerald-500",
    focus: "focus:border-emerald-500",
    soft: "bg-emerald-500/10",
  },
};

export function getCategories(studentType) {
  return studentType === "hosteller" ? hostellerCategories : dayScholarCategories;
}

export function getTheme(studentType) {
  return studentType === "hosteller" ? studentTypes.hosteller : studentTypes.dayScholar;
}