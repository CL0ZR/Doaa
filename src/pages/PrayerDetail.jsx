// src/pages/PrayerDetail.jsx
import { useParams, Link } from "react-router-dom";
import dayData from "../data/day.js";
import morningEveningData from "../data/morningEvening.js";
import quranData from "../data/quran.js";
import salahData from "../data/salah.js";
import zearatData from "../data/zearat.js";

const datasets = {
  zearat: zearatData,
  day: dayData,
  morningEvening: morningEveningData,
  quran: quranData,
  salah: salahData,
};

export default function PrayerDetail() {
  const { category, index } = useParams();
  const dataSet = datasets[category];
  if (!dataSet) return <p>المجموعة غير موجودة.</p>;

  const prayer = dataSet.prayers[Number(index)];
  if (!prayer) return <p>الدعاء غير موجود.</p>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{prayer.name}</h1>
      <p className="text-lg leading-relaxed mb-6">{prayer.content}</p>
      <Link
        to={`/${category}`}
        className="inline-block text-teal-600 hover:underline"
      >
        ← رجوع إلى {dataSet.title}
      </Link>
    </div>
  );
}
