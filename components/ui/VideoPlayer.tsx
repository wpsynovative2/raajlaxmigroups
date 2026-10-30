"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Spinner from "@/components/loading/Spinner";

/**
 * Click-to-play video: nothing downloads until the visitor presses play,
 * and a spinner covers buffering.
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  className = "aspect-video",
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);

  // Pause when the page is hidden by a client-side navigation.
  useLayoutEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, []);

  const start = () => {
    setStarted(true);
    setBuffering(true);
    void videoRef.current?.play().catch(() => setBuffering(false));
  };

  return (
    <div className={`group relative overflow-hidden rounded-md bg-navy-950 ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        title={title}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
        className="h-full w-full object-contain"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 grid place-items-center bg-navy-950/25 transition hover:bg-navy-950/10"
          aria-label={`Play video: ${title}`}
        >
          <span className="relative grid size-16 place-items-center rounded-full bg-white/95 text-rust-600 shadow-xl transition group-hover:scale-110 sm:size-20">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
            <svg viewBox="0 0 24 24" className="relative ml-1 size-7 sm:size-8" fill="currentColor" aria-hidden="true">
              <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
      {started && buffering && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-navy-950/30 text-white" role="status">
          <Spinner className="size-10" />
          <span className="sr-only">Loading video</span>
        </div>
      )}
    </div>
  );
}
