import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { id: 1, image: "/images/room1.jpg", rotation: -3 },
  { id: 2, image: "/images/room3.jpg", rotation: 2 },
  { id: 3, image: "/images/room5.jpg", rotation: -1 },
  { id: 4, image: "/images/room2.jpg", rotation: 3 },
  { id: 5, image: "/images/room4.jpg", rotation: -2 },
  { id: 6, image: "/images/room1.jpg", rotation: 1 },
];

const col1 = items.filter((_, i) => i % 2 === 0);
const col2 = items.filter((_, i) => i % 2 === 1);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 100 },
          {
            y: -200,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: -100 },
          {
            y: 200,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned center content */}
      <div ref={contentRef} className="relative z-10 h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Visual{" "}
            <em className="font-display italic">playground</em>
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto mb-6">
            A collection of visual experiments and creative explorations.
          </p>
          <button className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full border border-stroke px-5 py-2.5 transition-colors duration-200">
            View on Dribbble →
          </button>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none">
        <div className="w-full max-w-[1400px] px-8 grid grid-cols-2 gap-12 md:gap-40 mt-20">
          <div ref={col1Ref} className="flex flex-col gap-6 items-end">
            {col1.map((item) => (
              <div
                key={item.id}
                className="aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden pointer-events-auto cursor-pointer"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div ref={col2Ref} className="flex flex-col gap-6 items-start">
            {col2.map((item) => (
              <div
                key={item.id}
                className="aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden pointer-events-auto cursor-pointer"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
