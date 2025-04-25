// src/pages/QuranPrayers.jsx
import { Link } from "react-router-dom";
import data from "../data/quran.js";

export default function QuranPrayers() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">{data.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.prayers.map((prayer, idx) => (
          <Link
            to={`/quran/${idx}`}
            key={idx}
            className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <p className="text-lg font-medium text-gray-800">{prayer.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
