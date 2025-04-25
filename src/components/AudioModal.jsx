// src/components/AudioModal.jsx
import React, { useRef } from "react";

export default function AudioModal({ title, audioUrl, onClose }) {
  const audioRef = useRef();

  const skip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime + seconds
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000057] bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-2xl w-full text-left cursor-pointer text-red-500"
          onClick={onClose}
        >
          X
        </button>
        {/* هنا عرض اسم الدعاء */}
        <h2 className="text-xl font-bold mb-4">مشغل {title}</h2>

        <audio ref={audioRef} src={audioUrl} className="w-full mb-4" controls />

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => skip(-10)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            −10 ث
          </button>
          <button
            onClick={() =>
              audioRef.current.paused
                ? audioRef.current.play()
                : audioRef.current.pause()
            }
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            تشغيل / إيقاف
          </button>
          <button
            onClick={() => skip(10)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +10 ث
          </button>
        </div>

        <a href={audioUrl} download className="text-teal-600 hover:underline">
          تحميل الملف الصوتي
        </a>
      </div>
    </div>
  );
}
