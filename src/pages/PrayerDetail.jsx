// src/pages/PrayerDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import dayData from "../data/day.js";
import morningEveningData from "../data/morningEvening.js";
import quranData from "../data/quran.js";
import salahData from "../data/salah.js";
import zearatData from "../data/zearat.js";
import AudioModal from "../components/AudioModal.jsx";

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

  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="relative max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{prayer.name}</h1>
      <p className="text-lg leading-relaxed mb-6">{prayer.content}</p>
      <Link
        to={`/${category}`}
        className="inline-block text-teal-600 hover:underline mb-4"
      >
        ← رجوع إلى {dataSet.title}
      </Link>

      {prayer.audioUrl && (
        <>
          {/* زر عائم لتشغيل الصوت */}
          <button
            onClick={() => setShowPlayer(true)}
            className="fixed bottom-6 left-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 focus:outline-none"
            aria-label="تشغيل الصوت"
          >
            🔊
          </button>

          {/* نافذة مشغل الصوت */}
          {showPlayer && (
            <AudioModal
              title={prayer.name} 
              audioUrl={prayer.audioUrl}
              onClose={() => setShowPlayer(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
