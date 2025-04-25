// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import NavSlider from "./components/NavSlider";
import Header from "./components/Header";

import DayPrayers from "./pages/DayPrayers.jsx";
import MorningEveningPrayers from "./pages/MorningEveningPrayers.jsx";
import QuranPrayers from "./pages/QuranPrayers.jsx";
import SalahPrayers from "./pages/SalahPrayers.jsx";
import ZearatPrayers from "./pages/ZearatPrayers.jsx";
import PrayerDetail from "./pages/PrayerDetail.jsx";

const tabs = [
  { id: "zearat", label: "زيارات", path: "/zearat" },
  { id: "salah", label: "تعقيبات الصلاة", path: "/salah" },
  { id: "day", label: "أدعية الأيام", path: "/day" },
  {
    id: "morningEvening",
    label: "أذكار الصباح والمساء",
    path: "/morningEvening",
  },
  { id: "quran", label: "أدعية قرآنية", path: "/quran" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NavSlider items={tabs} />

      <main className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/zearat" replace />} />

          {/* قائمة البطاقات */}
          <Route path="/zearat" element={<ZearatPrayers />} />
          <Route path="/salah" element={<SalahPrayers />} />
          <Route path="/day" element={<DayPrayers />} />
          <Route path="/morningEvening" element={<MorningEveningPrayers />} />
          <Route path="/quran" element={<QuranPrayers />} />

          {/* تفاصيل الدعاء */}
          <Route path="/:category/:index" element={<PrayerDetail />} />
        </Routes>
      </main>
    </div>
  );
}
