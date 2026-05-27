import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  { id: 1, title: "Automotive Motion", span: "md:col-span-7", aspect: "aspect-[4/3]", image: "/images/room1.jpg" },
  { id: 2, title: "Urban Architecture", span: "md:col-span-5", aspect: "aspect-[4/3]", image: "/images/room2.jpg" },
  { id: 3, title: "Human Perspective", span: "md:col-span-5", aspect: "aspect-[4/3]", image: "/images/room3.jpg" },
  { id: 4, title: "Brand Identity", span: "md:col-span-7", aspect: "aspect-[4/3]", image: "/images/room4.jpg" },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative ${project.span} ${project.aspect} bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-bg/70 backdrop-blur-lg transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Hover label */}
      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative px-6 py-3 rounded-full bg-white"
            style={{ border: "2px solid transparent", backgroundClip: "padding-box" }}
          >
            <span className="text-bg text-sm">
              View — <em className="font-display">{project.title}</em>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-3">
              Featured{" "}
              <em className="font-display italic">projects</em>
            </h2>
            <p className="text-sm text-muted max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary rounded-full border border-stroke px-5 py-2.5 transition-colors duration-200 hover:border-transparent hover:[background:linear-gradient(hsl(var(--bg)),hsl(var(--bg)))_padding-box,linear-gradient(90deg,#89AACC,#4E85BF)_border-box]">
            View all work →
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
