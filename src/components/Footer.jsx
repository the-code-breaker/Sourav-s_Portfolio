import { about } from "../constants";
import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative z-10 py-10 border-t border-[#915EFF]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center font-bold text-white text-sm">
              S
            </div>
            <span className="text-white font-semibold">{about.name}</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href={about.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              <FiGithub />
            </a>
            <a
              href={about.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${about.email}`}
              className="text-secondary hover:text-white transition-colors"
            >
              <FiMail />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-secondary text-xs flex items-center gap-1">
            Built with <FiHeart className="text-[#915EFF]" /> by {about.name} ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
