import { motion } from "framer-motion";
import { githubUsername } from "../constants";
import { FiGitCommit, FiStar, FiGitPullRequest, FiCode } from "react-icons/fi";

const statCards = [
  {
    label: "GitHub Stats",
    src: `https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=transparent&hide_border=true&title_color=915EFF&icon_color=00cea8&text_color=aaa6c3&bg_color=00000000`,
  },
  {
    label: "Top Languages",
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=transparent&hide_border=true&title_color=915EFF&text_color=aaa6c3&bg_color=00000000`,
  },
  {
    label: "Streak",
    src: `https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=transparent&hide_border=true&ring=915EFF&fire=00cea8&currStreakLabel=915EFF&sideLabels=aaa6c3&dates=aaa6c3&currStreakNum=ffffff&sideNums=ffffff&background=00000000`,
  },
];

const quickStats = [
  { icon: FiGitCommit, label: "Total Commits", value: "1,200+", color: "#915EFF" },
  { icon: FiStar, label: "Stars Earned", value: "50+", color: "#f59e0b" },
  { icon: FiGitPullRequest, label: "PRs Merged", value: "80+", color: "#00cea8" },
  { icon: FiCode, label: "Repositories", value: "30+", color: "#61dafb" },
];

export default function GitHubStats() {
  return (
    <section id="github" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Open Source
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="text-secondary text-sm mt-4 max-w-2xl leading-relaxed">
            My open-source contributions and coding activity — building in
            public, one commit at a time.
          </p>
        </motion.div>

        {/* Quick stat counters */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-xl neon-border p-5 text-center group card-hover"
            >
              <stat.icon
                size={24}
                className="mx-auto mb-3 transition-transform duration-300 group-hover:scale-125"
                style={{ color: stat.color }}
              />
              <p
                className="text-2xl font-black"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-secondary text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* GitHub stat cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass rounded-2xl neon-border p-4 card-hover overflow-hidden"
            >
              <img
                src={card.src}
                alt={card.label}
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 glass rounded-2xl neon-border p-4 overflow-hidden"
        >
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=react-dark&hide_border=true&bg_color=00000000&color=915EFF&line=00cea8&point=915EFF&area=true&area_color=915EFF`}
            alt="GitHub Contribution Graph"
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00cea8] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#915EFF]/25 transition-all duration-300"
          >
            <FiCode size={16} />
            View Full Profile on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
