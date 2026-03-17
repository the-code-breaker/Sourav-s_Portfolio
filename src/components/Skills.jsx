import { motion } from "framer-motion";
import { skills } from "../constants";

const categoryIcons = {
  "Programming Languages": "⚡",
  "Frontend Development": "🎨",
  "Backend Development": "⚙️",
  "Databases & Storage": "🗄️",
  "Cloud & DevOps": "☁️",
  "AI/ML Technologies": "🤖",
  "Data & BI Tools": "📊",
};

const categoryGradients = {
  "Programming Languages": "from-[#915EFF] to-[#bf61ff]",
  "Frontend Development": "from-[#61dafb] to-[#915EFF]",
  "Backend Development": "from-[#00cea8] to-[#915EFF]",
  "Databases & Storage": "from-[#00ed64] to-[#00cea8]",
  "Cloud & DevOps": "from-[#2496ed] to-[#915EFF]",
  "AI/ML Technologies": "from-[#ff6b6b] to-[#915EFF]",
  "Data & BI Tools": "from-[#ffd93d] to-[#ff6b6b]",
};

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 py-20">
      <span className="hash-span" id="skills">&nbsp;</span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            My technical arsenal
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 neon-border card-hover group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    categoryGradients[skill.category] || "from-[#915EFF] to-[#00cea8]"
                  } flex items-center justify-center text-lg`}
                >
                  {categoryIcons[skill.category] || "💡"}
                </div>
                <h3 className="text-white text-sm font-bold">{skill.category}</h3>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-lg bg-[#050816]/80 border border-[#915EFF]/15 text-secondary hover:text-white hover:border-[#915EFF]/40 transition-all duration-300 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
