import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setShowTop(scrollTop > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-[#915EFF] via-[#00cea8] to-[#bf61ff]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center text-white shadow-lg shadow-[#915EFF]/25 hover:shadow-[#915EFF]/50 hover:scale-110 transition-all duration-300 group"
            title="Back to top"
          >
            <FiArrowUp
              size={20}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            {/* Circular progress ring */}
            <svg
              className="absolute inset-0"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="24"
                cy="24"
                r="22"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - progress / 100)}`}
                transform="rotate(-90 24 24)"
                className="transition-all duration-150"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
