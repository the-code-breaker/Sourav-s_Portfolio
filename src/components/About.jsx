import { motion } from "framer-motion";
import { about, education, certifications, achievements } from "../constants";
import { FiAward, FiBookOpen, FiCode } from "react-icons/fi";

function SectionWrapper({ children, id }) {
  return (
    <section id={id} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-16 py-20">
      <span className="hash-span" id={id}>&nbsp;</span>
      {children}
    </section>
  );
}

export default function About() {
  const stats = [
    { label: "Years Experience", value: "1.5+", icon: <FiCode /> },
    { label: "Projects Built", value: "10+", icon: <FiBookOpen /> },
    { label: "DSA Problems", value: "500+", icon: <FiAward /> },
  ];

  return (
    <SectionWrapper id="about">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-secondary text-sm uppercase tracking-widest">Introduction</p>
        <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
          About <span className="gradient-text">Me</span>
        </h2>
      </motion.div>

      {/* About content */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 neon-border card-hover lg:col-span-1"
        >
          <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden neon-glow mb-6">
            <img
              src={about.profileImage}
              alt={about.name}
              className="w-full h-full object-cover scale-125 -translate-y-3"
            />
          </div>
          <h3 className="text-white text-xl font-bold text-center">{about.name}</h3>
          <p className="text-[#915EFF] text-center mt-1">{about.title}</p>
          <p className="text-secondary text-sm text-center mt-4 leading-relaxed">
            {about.summary}
          </p>

          {/* Stats */}
          <div className="flex justify-around mt-8 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[#915EFF] text-xl mb-1">{stat.icon}</div>
                <p className="text-white font-bold text-lg">{stat.value}</p>
                <p className="text-secondary text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Education */}
          <div className="glass rounded-2xl p-8 neon-border card-hover">
            <h3 className="text-white text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center text-lg">
                🎓
              </span>
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="pl-4 border-l-2 border-[#915EFF]/30 hover:border-[#915EFF] transition-colors"
                >
                  <h4 className="text-white font-semibold">{edu.degree}</h4>
                  <p className="text-secondary text-sm">{edu.institution}</p>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <span className="text-[#00cea8] text-xs">{edu.date}</span>
                    {edu.gpa && (
                      <span className="text-[#915EFF] text-xs font-semibold">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass rounded-2xl p-8 neon-border card-hover">
            <h3 className="text-white text-xl font-bold flex items-center gap-3 mb-6">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00cea8] to-[#915EFF] flex items-center justify-center text-lg">
                🏅
              </span>
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[#050816]/60 border border-[#915EFF]/10 hover:border-[#915EFF]/30 transition-colors"
                >
                  <p className="text-white text-sm font-semibold">{cert.name}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-[#00cea8] text-xs">{cert.issuer}</span>
                    <span className="text-secondary text-xs">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass rounded-2xl p-8 neon-border card-hover">
            <h3 className="text-white text-xl font-bold flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#bf61ff] to-[#915EFF] flex items-center justify-center text-lg">
                🏆
              </span>
              Achievements
            </h3>
            {achievements.map((a, i) => (
              <p key={i} className="text-secondary text-sm leading-relaxed">
                {a}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
