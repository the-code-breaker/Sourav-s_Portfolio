import { motion } from "framer-motion";
import { about } from "../constants";
import HeroCanvas from "./canvas/HeroCanvas";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiChevronDown,
} from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 sm:px-16 gap-8 pt-20">
        {/* Left decorative line */}
        <div className="hidden md:flex flex-col justify-center items-center">
          <div className="w-5 h-5 rounded-full bg-[#915EFF] pulse-glow" />
          <div className="w-1 h-40 sm:h-80 bg-gradient-to-b from-[#915EFF] to-transparent" />
        </div>

        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-white font-black text-4xl sm:text-5xl lg:text-7xl leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text text-shadow-glow">
                {about.name}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-secondary mt-4 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed"
          >
            {about.summary}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4 mt-8"
          >
            {[
              { icon: <FiGithub />, href: about.github, label: "GitHub" },
              { icon: <FiLinkedin />, href: about.linkedin, label: "LinkedIn" },
              {
                icon: <FiMail />,
                href: `mailto:${about.email}`,
                label: "Email",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass neon-border flex items-center justify-center text-secondary hover:text-white hover:bg-[#915EFF]/20 transition-all duration-300 text-xl"
              >
                {social.icon}
              </a>
            ))}
            <div className="flex items-center gap-2 text-secondary text-sm ml-4">
              <FiMapPin className="text-[#00cea8]" />
              <span>{about.location}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-4 mt-8 flex-wrap"
          >
            <a
              href="#projects"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#bf61ff] text-white font-semibold hover:shadow-lg hover:shadow-[#915EFF]/30 transition-all duration-300 hover:-translate-y-1"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-xl glass neon-border text-white font-semibold hover:bg-[#915EFF]/10 transition-all duration-300 hover:-translate-y-1"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:block relative"
        >
          <div className="w-72 h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden neon-glow neon-border floating">
            <img
              src={about.profileImage}
              alt={about.name}
              className="w-full h-full object-cover scale-125 -translate-y-4"
            />
          </div>
          {/* Decorative rings */}
          <div className="absolute -inset-4 rounded-full border border-[#915EFF]/20 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute -inset-8 rounded-full border border-[#00cea8]/10 animate-spin" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 w-full flex justify-center z-10">
        <a href="#about">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-secondary text-2xl"
          >
            <FiChevronDown />
          </motion.div>
        </a>
      </div>
    </section>
  );
}
