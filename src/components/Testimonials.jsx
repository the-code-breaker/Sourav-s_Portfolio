import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../constants";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={14}
          className={i < rating ? "text-[#f59e0b] fill-[#f59e0b]" : "text-secondary/30"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            What Others Say
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Testi<span className="gradient-text">monials</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="mt-12 relative">
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass rounded-2xl neon-border p-8 sm:p-12"
              >
                {/* Quote decoration */}
                <div className="text-[80px] leading-none text-[#915EFF]/15 font-serif absolute top-4 left-8 select-none">
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <StarRating rating={testimonials[current].rating} />

                  <p className="text-white/90 text-base sm:text-lg leading-relaxed mt-5 italic">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].name}
                      className="w-12 h-12 rounded-full border-2 border-[#915EFF]/30 object-cover"
                    />
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {testimonials[current].name}
                      </p>
                      <p className="text-secondary text-xs">
                        {testimonials[current].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass neon-border flex items-center justify-center text-secondary hover:text-white hover:neon-glow transition-all"
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-8 bg-gradient-to-r from-[#915EFF] to-[#00cea8]"
                      : "w-2 bg-secondary/30 hover:bg-secondary/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass neon-border flex items-center justify-center text-secondary hover:text-white hover:neon-glow transition-all"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
