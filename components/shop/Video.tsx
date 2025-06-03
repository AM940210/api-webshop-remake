"use client";

import { useRef, useState, PropsWithChildren } from "react";

export default function Video({ children, src }: PropsWithChildren & { src: string}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const handleVideoToggle = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-lg mt-8">
      <video
        ref={videoRef}
        src={src} // Rätt väg till videon
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {children}

      {/* Liten play/pause ikon nere till höger */}
      <button
        onClick={handleVideoToggle}
        className="absolute bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-70 text-black w-12 h-12 rounded-full flex items-center justify-center shadow-md z-50"
        aria-label="Toggle video play/pause"
      >
        {isPlaying ? (
            <span className="text-2xl">⏸</span> // Paus ikon
          ) : (
            <span className="text-2xl">▸</span> // Play ikon
          )}
      </button>
    </div>
  );
}