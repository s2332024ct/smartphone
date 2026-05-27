import { motion } from "framer-motion";

const entries = [
  { id: 1, title: "The Future of Interaction Design", readTime: "5 min read", date: "Jan 12, 2026", image: "/images/room5.jpg" },
  { id: 2, title: "Building Systems That Scale", readTime: "8 min read", date: "Dec 28, 2025", image: "/images/room3.jpg" },
  { id: 3, title: "Typography in the Digital Age", readTime: "4 min read", date: "Dec 15, 2025", image: "/images/room1.jpg" },
  { id: 4, title: "Minimalism as a Design Philosophy", readTime: "6 min read", date: "Nov 30, 2025", image: "/images/room2.jpg" },
];

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
              Recent{" "}
              <em className="font-display italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">
              Reflections on design, technology, and everything in between.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full border border-stroke px-5 py-2.5 transition-colors duration-200">
            View all →
          </button>
        </motion.div>

        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full cursor-pointer transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">{entry.title}</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-muted flex-shrink-0">
                <span>{entry.readTime}</span>
                <span>{entry.date}</span>
              </div>
              <div className="text-muted group-hover:text-text-primary transition-colors duration-200 flex-shrink-0">
                →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
