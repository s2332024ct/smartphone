import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Hls from "hls.js";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const MARQUEE_TEXT = "BUILDING THE FUTURE • ";
const socialLinks = ["Twitter", "LinkedIn", "Dribbble", "GitHub"];

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_SRC;
    }
  }, []);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <footer className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video */}
      <div className="relative h-[50vh] mb-16 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%, -50%) scaleY(-1)" }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Marquee */}
      <div className="overflow-hidden mb-16">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array(20).fill(MARQUEE_TEXT).map((text, i) => (
            <span key={i} className="text-4xl md:text-5xl font-display italic text-text-primary/20 flex-shrink-0 pr-8">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center mb-16">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Get in touch</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-8">
          Let's work together
        </h2>
        <a
          href="mailto:hello@michaelsmith.com"
          className="inline-flex items-center gap-2 text-sm text-text-primary rounded-full border border-stroke px-8 py-4 transition-all duration-300 hover:border-transparent hover:scale-105"
          style={{
            background: "hsl(var(--bg))",
          }}
        >
          hello@michaelsmith.com ↗
        </a>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stroke">
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <button key={link} className="text-xs text-muted hover:text-text-primary transition-colors duration-200">
                {link}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
