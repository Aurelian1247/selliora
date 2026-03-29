"use client";

import { useRef, useState } from "react";

export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  return (
    <section className="relative z-10 mt-24 px-4">
      <div className="mx-auto max-w-5xl text-center">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          See Selliora in action
        </h2>

        <p className="mt-3 text-white/60 text-sm md:text-base">
          Generate product listings in seconds — from product, image or CSV.
        </p>

        {/* VIDEO WRAPPER */}
        <div className="relative mt-10 rounded-2xl border border-white/10 bg-black/30 p-2">

          {/* VIDEO */}
          <video
  ref={videoRef}
  controls={isPlaying}
  playsInline
  webkit-playsinline="true"
  poster="/demo-thumbnail.jpg"
  className="w-full rounded-xl object-cover"
>
  <source src="/demo.mp4" type="video/mp4" />
</video>

          {/* PLAY BUTTON OVERLAY */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
  onClick={handlePlay}
  className="group relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-2xl transition hover:scale-110"
>
  {/* glow */}
  <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-30 group-hover:opacity-50 transition" />

  {/* play icon */}
  <div className="relative ml-1">
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="white"
    >
      <polygon points="5,3 19,12 5,21" />
    </svg>
  </div>
</button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <a
            href="/signup"
            className="inline-block rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition"
          >
            Generate your first product →
          </a>
        </div>

      </div>
    </section>
  );
}