import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { learningCourses } from "../constants";
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronRight,
  FiCode,
  FiPlay,
  FiLayers,
  FiAward,
} from "react-icons/fi";

function LessonIcon({ type }) {
  if (type === "project")
    return <FiCode className="text-[#00cea8]" size={14} />;
  return <FiBookOpen className="text-[#915EFF]" size={14} />;
}

function ModuleAccordion({ module, moduleIndex, isOpen, onToggle }) {
  const projectCount = module.lessons.filter((l) => l.type === "project").length;

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden">
      {/* Module header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 sm:p-5 hover:bg-white/[0.02] transition-colors text-left"
      >
        {/* Module number */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#915EFF]/20 to-[#00cea8]/20 border border-[#915EFF]/20 flex items-center justify-center text-[#915EFF] text-sm font-bold shrink-0">
          {String(moduleIndex + 1).padStart(2, "0")}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm sm:text-base font-semibold truncate">
            {module.title}
          </h4>
          <div className="flex items-center gap-3 text-secondary text-[11px] mt-1">
            <span>{module.lessons.length} lessons</span>
            {projectCount > 0 && (
              <span className="flex items-center gap-1 text-[#00cea8]">
                <FiCode size={10} /> {projectCount} project
                {projectCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-secondary shrink-0"
        >
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      {/* Lessons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 space-y-1">
              {module.lessons.map((lesson, li) => (
                <div
                  key={li}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#915EFF]/40 transition-colors">
                    <LessonIcon type={lesson.type} />
                  </div>

                  <span className="text-secondary text-[13px] flex-1 group-hover:text-white transition-colors truncate">
                    {lesson.title}
                  </span>

                  <span className="text-secondary/50 text-[11px] shrink-0 hidden sm:block">
                    {lesson.duration}
                  </span>

                  {lesson.type === "project" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00cea8]/10 text-[#00cea8] font-medium shrink-0">
                      Project
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CourseDetail({ course, onBack }) {
  const [openModule, setOpenModule] = useState(0);

  const totalDuration = course.modules.reduce(
    (acc, mod) =>
      acc +
      mod.lessons.reduce(
        (a, l) => a + parseInt(l.duration),
        0
      ),
    0
  );
  const totalProjects = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.type === "project").length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-secondary text-sm hover:text-white transition-colors mb-8 group"
      >
        <FiChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        Back to courses
      </button>

      {/* Course header */}
      <div className="glass rounded-2xl neon-border p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${course.color}20, ${course.color}05)`,
              border: `1px solid ${course.color}30`,
            }}
          >
            {course.icon}
          </div>

          <div className="flex-1">
            <h3 className="text-white text-2xl sm:text-3xl font-bold">
              {course.title}
            </h3>
            <p className="text-secondary text-sm mt-2 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-5">
              <div className="flex items-center gap-2 text-[13px]">
                <FiLayers className="text-[#915EFF]" />
                <span className="text-secondary">
                  {course.modules.length} modules
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <FiBookOpen className="text-[#915EFF]" />
                <span className="text-secondary">
                  {course.totalLessons} lessons
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <FiPlay className="text-[#00cea8]" />
                <span className="text-secondary">
                  {totalDuration} min total
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <FiCode className="text-[#00cea8]" />
                <span className="text-secondary">
                  {totalProjects} hands-on projects
                </span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <FiAward className="text-[#f59e0b]" />
                <span className="text-secondary">{course.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="glass rounded-2xl neon-border p-4 sm:p-6 space-y-2">
        <h4 className="text-white text-lg font-bold mb-4 px-1">
          Course Curriculum
        </h4>
        {course.modules.map((mod, i) => (
          <ModuleAccordion
            key={i}
            module={mod}
            moduleIndex={i}
            isOpen={openModule === i}
            onToggle={() => setOpenModule(openModule === i ? -1 : i)}
          />
        ))}
      </div>
    </motion.div>
  );
}

function CourseCard({ course, index, onClick }) {
  const totalProjects = course.modules.reduce(
    (acc, mod) => acc + mod.lessons.filter((l) => l.type === "project").length,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onClick={onClick}
      className="glass rounded-2xl neon-border p-6 sm:p-8 card-hover cursor-pointer group relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: course.color }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
          style={{
            background: `linear-gradient(135deg, ${course.color}20, ${course.color}05)`,
            border: `1px solid ${course.color}30`,
          }}
        >
          {course.icon}
        </div>

        <h3 className="text-white text-xl font-bold group-hover:text-[#915EFF] transition-colors duration-300">
          {course.title}
        </h3>

        <p className="text-secondary text-sm mt-3 leading-relaxed line-clamp-2">
          {course.description}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 mt-5 text-[12px] text-secondary">
          <span className="flex items-center gap-1">
            <FiLayers size={12} className="text-[#915EFF]" />
            {course.modules.length} modules
          </span>
          <span className="flex items-center gap-1">
            <FiBookOpen size={12} className="text-[#915EFF]" />
            {course.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <FiCode size={12} className="text-[#00cea8]" />
            {totalProjects} projects
          </span>
        </div>

        {/* Difficulty badge */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] px-3 py-1 rounded-full bg-[#915EFF]/10 text-[#915EFF] font-medium border border-[#915EFF]/20">
            {course.difficulty}
          </span>
          <span className="flex items-center gap-1 text-[#00cea8] text-xs font-medium group-hover:gap-2 transition-all">
            Explore <FiChevronRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Learning() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section id="learning" className="relative z-10 py-20">
      <span className="hash-span" id="learning">
        &nbsp;
      </span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Structured Knowledge
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Learning <span className="gradient-text">Hub</span>
          </h2>
          <p className="text-secondary text-sm mt-4 max-w-2xl leading-relaxed">
            Complete, structured courses I&apos;ve built while mastering each
            technology — from fundamentals to production-grade patterns.
          </p>
        </motion.div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {selectedCourse ? (
              <CourseDetail
                key="detail"
                course={selectedCourse}
                onBack={() => setSelectedCourse(null)}
              />
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {learningCourses.map((course, i) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={i}
                    onClick={() => setSelectedCourse(course)}
                  />
                ))}

                {/* Coming soon placeholder cards */}
                {["HTML & CSS Mastery", "JavaScript Deep Dive"].map(
                  (title, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: (learningCourses.length + i) * 0.15,
                      }}
                      className="glass rounded-2xl neon-border p-6 sm:p-8 relative overflow-hidden opacity-60"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[#915EFF]/30 text-6xl font-black rotate-[-15deg] select-none">
                          SOON
                        </span>
                      </div>
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-5">
                          {i === 0 ? "🎨" : "⚡"}
                        </div>
                        <h3 className="text-white/50 text-xl font-bold">
                          {title}
                        </h3>
                        <p className="text-secondary/50 text-sm mt-3">
                          Coming soon — this course is currently being crafted.
                        </p>
                        <div className="mt-5">
                          <span className="text-[11px] px-3 py-1 rounded-full bg-white/5 text-secondary/40 border border-white/10">
                            Coming Soon
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
