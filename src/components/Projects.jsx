import { motion } from "framer-motion";
import { projects } from "../constants";
import { FiExternalLink, FiGithub } from "react-icons/fi";

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass rounded-2xl neon-border overflow-hidden card-hover group"
    >
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

        {/* Floating action */}
        <div className="absolute top-4 right-4 flex gap-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#915EFF] transition-colors"
          >
            <FiGithub />
          </a>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-[#00cea8] transition-colors"
          >
            <FiExternalLink />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold">{project.name}</h3>
        <p className="text-secondary text-sm mt-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={`text-xs font-semibold ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-20">
      <span className="hash-span" id="projects">&nbsp;</span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            My work
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-secondary text-sm mt-4 max-w-2xl leading-relaxed">
            Real-world projects that showcase my expertise in full-stack
            development, cloud services, and building scalable applications.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
