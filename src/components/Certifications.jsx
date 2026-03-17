import { motion } from "framer-motion";
import { certifications, achievements, education } from "../constants";
import { FiAward, FiBookOpen, FiStar, FiMapPin, FiCalendar } from "react-icons/fi";

export default function Certifications() {
  return (
    <section id="certifications" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Credentials
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white text-xl font-bold flex items-center gap-2 mb-6">
              <FiBookOpen className="text-[#915EFF]" /> Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl neon-border p-5 card-hover relative overflow-hidden group"
                >
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#915EFF] to-[#00cea8] rounded-r" />

                  <div className="pl-4">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      {edu.degree}
                    </h4>
                    <p className="text-[#915EFF] text-sm mt-1 font-medium">
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-secondary text-xs">
                      <span className="flex items-center gap-1">
                        <FiMapPin size={11} /> {edu.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={11} /> {edu.date}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00cea8]/10 text-[#00cea8] text-xs font-semibold border border-[#00cea8]/20">
                        <FiStar size={11} /> CGPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications + Achievements */}
          <div className="space-y-8">
            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white text-xl font-bold flex items-center gap-2 mb-6">
                <FiAward className="text-[#00cea8]" /> Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass rounded-xl neon-border p-5 card-hover flex items-start gap-4 group"
                  >
                    {/* Badge */}
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#00cea8]/20 to-[#915EFF]/20 border border-[#00cea8]/30 flex items-center justify-center">
                      <FiAward
                        size={20}
                        className="text-[#00cea8] group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">
                        {cert.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[#915EFF] text-xs font-medium">
                          {cert.issuer}
                        </span>
                        <span className="text-secondary text-xs">
                          · {cert.year}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h3 className="text-white text-xl font-bold flex items-center gap-2 mb-6">
                <FiStar className="text-[#f59e0b]" /> Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="glass rounded-xl neon-border p-4 flex items-center gap-3 card-hover"
                  >
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center text-lg">
                      🏆
                    </div>
                    <p className="text-secondary text-sm">{ach}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
