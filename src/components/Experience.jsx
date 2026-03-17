import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";

function ExperienceCard({ experience }) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(21, 16, 48, 0.6)",
        color: "#fff",
        borderRadius: "16px",
        border: "1px solid rgba(145, 94, 255, 0.2)",
      }}
      contentArrowStyle={{
        borderRight: "7px solid rgba(145, 94, 255, 0.3)",
      }}
      date={experience.date}
      dateClassName="text-secondary !text-sm"
      iconStyle={{
        background: "linear-gradient(135deg, #915EFF, #00cea8)",
        boxShadow: "0 0 20px rgba(145, 94, 255, 0.4)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full text-2xl">
          {experience.icon}
        </div>
      }
    >
      <div>
        <h3 className="text-white text-xl font-bold">{experience.title}</h3>
        <p className="text-[#915EFF] text-sm font-semibold mt-1" style={{ margin: 0 }}>
          {experience.company}
        </p>
        <p className="text-secondary text-xs mt-1">{experience.location}</p>
      </div>

      <ul className="mt-5 list-none space-y-3">
        {experience.points.map((point, i) => (
          <li
            key={i}
            className="text-secondary text-sm pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-[#915EFF] before:to-[#00cea8]"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-20">
      <span className="hash-span" id="experience">&nbsp;</span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            What I have done so far
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="mt-16">
          <VerticalTimeline lineColor="rgba(145, 94, 255, 0.3)">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} experience={exp} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
}
