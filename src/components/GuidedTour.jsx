import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiX, FiNavigation } from "react-icons/fi";

const TOUR_STEPS = [
  {
    target: null,
    title: "Welcome! 👋",
    description:
      "Hi there! I'm your guide. Let me walk you through this portfolio so you don't miss anything awesome. Ready?",
    position: "center",
  },
  {
    target: "nav",
    title: "Navigation Bar",
    description:
      "This is the navigation bar. Use it to jump to any section of the site or visit the Blog, Learning, and Playground pages.",
    position: "bottom",
  },
  {
    target: "#about",
    title: "About Me",
    description:
      "Learn about who I am, my background, skill highlights, and what drives me as a developer.",
    position: "top",
  },
  {
    target: "#experience",
    title: "Experience",
    description:
      "Here you'll find my professional journey — roles, companies, and key achievements along the way.",
    position: "top",
  },
  {
    target: "#skills",
    title: "Skills",
    description:
      "Check out the technologies and tools I work with — from frontend frameworks to cloud services.",
    position: "top",
  },
  {
    target: "#projects",
    title: "Projects",
    description:
      "Explore the projects I've built. Each card links to source code and live demos.",
    position: "top",
  },
  {
    target: "#certifications",
    title: "Certifications",
    description:
      "Verified certifications and credentials that back up my skillset.",
    position: "top",
  },
  {
    target: "#github",
    title: "GitHub Stats",
    description:
      "A live snapshot of my GitHub activity — contributions, streaks, and top languages.",
    position: "top",
  },
  {
    target: "#contact",
    title: "Contact",
    description:
      "Want to connect? Drop me a message here. I'd love to hear from you!",
    position: "top",
  },
  {
    target: null,
    title: "You're All Set! 🎉",
    description:
      "That's the full tour! Feel free to explore on your own. You can restart this tour anytime from the help button in the bottom-left corner.",
    position: "center",
  },
];

export default function GuidedTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const [spotlightStyle, setSpotlightStyle] = useState({});
  const [showButton, setShowButton] = useState(false);
  const tooltipRef = useRef(null);

  // Check first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem("portfolio_tour_completed");
    if (!hasVisited) {
      // Small delay to let the page render
      const timer = setTimeout(() => setIsActive(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowButton(true);
    }
  }, []);

  const positionTooltip = useCallback(() => {
    const step = TOUR_STEPS[currentStep];
    if (!step) return;

    if (step.position === "center" || !step.target) {
      setSpotlightStyle({ display: "none" });
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      return;
    }

    const el = document.querySelector(step.target);
    if (!el) {
      setSpotlightStyle({ display: "none" });
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
      return;
    }

    const rect = el.getBoundingClientRect();
    const padding = 12;

    setSpotlightStyle({
      display: "block",
      position: "fixed",
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      borderRadius: "12px",
    });

    // Position tooltip relative to the element
    const tooltipWidth = 360;
    let top, left;

    if (step.position === "bottom") {
      top = rect.bottom + 20;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    } else {
      // "top" — place tooltip at page-visible area near the section
      top = rect.top + 60;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
    }

    // Keep tooltip on screen
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));
    top = Math.max(16, Math.min(top, window.innerHeight - 280));

    setTooltipStyle({
      position: "fixed",
      top,
      left,
    });
  }, [currentStep]);

  useEffect(() => {
    if (!isActive) return;
    const step = TOUR_STEPS[currentStep];

    if (step.target && step.position !== "center") {
      const el = document.querySelector(step.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Wait for scroll to finish before positioning
        const timer = setTimeout(positionTooltip, 600);
        return () => clearTimeout(timer);
      }
    }

    positionTooltip();
  }, [currentStep, isActive, positionTooltip]);

  // Reposition on resize
  useEffect(() => {
    if (!isActive) return;
    const handleResize = () => positionTooltip();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive, positionTooltip]);

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem("portfolio_tour_completed", "true");
    setShowButton(true);
  };

  const restartTour = () => {
    setCurrentStep(0);
    setIsActive(true);
    setShowButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const step = TOUR_STEPS[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === TOUR_STEPS.length - 1;
  const isCentered = step?.position === "center" || !step?.target;

  return (
    <>
      {/* Floating restart button */}
      <AnimatePresence>
        {showButton && !isActive && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={restartTour}
            className="fixed bottom-6 left-6 z-[9999] w-12 h-12 rounded-full bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center text-white shadow-lg cursor-pointer"
            title="Restart Tour"
          >
            <FiNavigation size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tour overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="guided-tour-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dark overlay with spotlight cutout */}
            {!isCentered && (
              <div
                className="guided-tour-spotlight"
                style={spotlightStyle}
              />
            )}

            {/* Tooltip */}
            <motion.div
              ref={tooltipRef}
              className="guided-tour-tooltip"
              style={tooltipStyle}
              key={currentStep}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Close button */}
              <button
                onClick={endTour}
                className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>

              {/* Avatar / assistant icon */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center text-white text-lg shrink-0">
                  ✨
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base leading-tight">
                    {step.title}
                  </h3>
                  <span className="text-xs text-white/40">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Progress bar */}
              <div className="w-full h-1 rounded-full bg-white/10 mb-4 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#915EFF] to-[#00cea8]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / TOUR_STEPS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={endTour}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors cursor-pointer"
                >
                  Skip Tour
                </button>
                <div className="flex gap-2">
                  {!isFirst && (
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                    >
                      <FiArrowLeft size={14} />
                      Back
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#915EFF] to-[#00cea8] text-white text-xs font-semibold transition-transform hover:scale-105 cursor-pointer"
                  >
                    {isLast ? "Finish" : isFirst ? "Let's Go!" : "Next"}
                    {!isLast && <FiArrowRight size={14} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
