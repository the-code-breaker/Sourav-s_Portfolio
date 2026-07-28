import { motion } from "framer-motion";
import { FiDownload, FiMail, FiGlobe, FiLinkedin, FiMapPin } from "react-icons/fi";

const ACCENT = "#6B3FA0";

const experience = [
  {
    role: "Software Engineer I",
    date: "June 2023 – Present",
    company: "MAQ Software",
    points: [
      "Developed a natural language to SQL generator using Agent AI, FastAPI, React, Azure OpenAI, and Azure Search.",
      "Designed Databricks database architecture for user data storage and query history tracking.",
      "Built an AI-based dashboard application that surfaces insights on data generated through an orchestrator agentic-flow solution, along with key KPIs.",
      "Developed Databricks Apps and built an AI dashboard using Genie agents.",
      "Applied Spark optimization techniques such as Liquid Clustering to improve table read/write performance, leveraging a strong understanding of Spark internals.",
    ],
  },
  {
    role: "Associate Software Engineer",
    date: "July 2022 – May 2023",
    company: "MAQ Software",
    points: [
      "Built a data extraction system for Power BI RLS reports using DAX queries and XMLA endpoints with Snowflake integration.",
      "Optimized Excel export using a SAX streaming approach, improving performance for large datasets.",
      "Created a Power BI hierarchical slicer custom visual with search, sorting, filtering, and virtualization using react-window.",
    ],
  },
];

const education = [
  {
    title: "Bachelor of Engineering in Computer Science",
    date: "Aug 2021 – Present",
    sub: "Chitkara University Institute of Engineering & Technology, Rajpura",
    right: "CGPA: 9.12/10",
  },
  {
    title: "Senior Secondary Education, DAV Public School Gohar, Mandi",
    date: "April 2021",
    sub: "",
    right: "",
  },
];

const certifications = [
  "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
  "Microsoft Certified: Fabric Data Engineer Associate (DP-700)",
  "Microsoft Certified: SQL AI Developer Associate (DP-800)",
  "GitHub Certified: GitHub Copilot (GH-300)",
  "Microsoft Certified: AI Agent Builder Associate (AB-620)",
];

const projects = [
  {
    name: "Cricket Scorer Application",
    stack: "React Native",
    points: [
      "Built a cricket scoring app that lets users track local match scores, create teams, and add players to start a match through a simple, intuitive flow.",
      "Published on the Google Play Store for public use.",
    ],
  },
  {
    name: "Youth Organization Web App",
    stack: "React, Node.js, MongoDB, MUI, Vercel",
    points: [
      "Built a role-based platform for a youth organization to manage monthly contributions and member records with RBAC.",
      "Deployed a full-stack application on Vercel with Cloudinary for images and Nodemailer for email notifications.",
    ],
  },
  {
    name: "Real-time Chat Application",
    stack: "Vite.js, Chakra UI, Express.js, Socket.IO, MongoDB",
    points: [
      "Built a real-time messaging app with WebSocket technology, reducing message delivery time by 50%.",
      "Implemented a notification system for new messages and group activities, increasing user engagement by 20%.",
    ],
  },
];

const skills = [
  ["Languages:", "JavaScript, TypeScript, Python, SQL"],
  ["Frontend:", "React.js, React Native, Vite.js, Material-UI, Chakra UI, Tailwind CSS"],
  ["Backend:", "Node.js, Express.js, FastAPI, Socket.IO, RESTful APIs"],
  ["Databases:", "MongoDB, Databricks, Snowflake, MySQL"],
  [
    "Cloud & DevOps:",
    "Azure (OpenAI, Search), Azure DevOps, AWS, AWS ECS, ECR, Docker, Power BI, Vercel, Render, Git/GitHub, Cloudinary",
  ],
  [
    "Concepts:",
    "Data Structures & Algorithms, OOP, Agentic AI Solutions, Agent AI, Real-time Communication, RBAC",
  ],
];

function SectionTitle({ children }) {
  return (
    <h2
      className="text-[15px] font-bold uppercase tracking-wide mt-5 mb-2 pb-1 border-b"
      style={{ color: ACCENT, borderColor: "#E2D9F0" }}
    >
      {children}
    </h2>
  );
}

function EntryHeader({ left, right, subLeft, subRight }) {
  return (
    <>
      <div className="flex justify-between items-baseline gap-4">
        <span className="font-bold text-gray-900">{left}</span>
        {right && <span className="font-bold text-gray-900 whitespace-nowrap">{right}</span>}
      </div>
      {(subLeft || subRight) && (
        <div className="flex justify-between items-baseline gap-4 text-gray-500 italic text-[13px]">
          <span>{subLeft}</span>
          {subRight && <span className="whitespace-nowrap">{subRight}</span>}
        </div>
      )}
    </>
  );
}

export default function Resume() {
  const handlePrint = () => window.print();

  return (
    <section id="resume" className="relative z-10 py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Header + actions (hidden when printing) */}
        <div className="no-print">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-widest">
              Curriculum Vitae
            </p>
            <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
              My <span className="gradient-text">Resume</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 mb-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#915EFF]/25"
              style={{ background: "linear-gradient(135deg, #915EFF, #00cea8)" }}
            >
              <FiDownload size={16} /> Download PDF
            </button>
            <span className="text-secondary text-xs">
              Opens the print dialog — choose “Save as PDF”.
            </span>
          </motion.div>
        </div>

        {/* Resume paper */}
        <motion.div
          id="resume-paper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white text-gray-800 rounded-2xl shadow-2xl px-8 sm:px-12 py-10 text-[13.5px] leading-relaxed"
        >
          {/* Name + contact */}
          <div className="text-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sourav Sharma</h1>
            <p className="text-base font-semibold mt-1" style={{ color: ACCENT }}>
              Full Stack Developer
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 mt-3 text-[12.5px] text-gray-600">
              <a href="mailto:souravsharma191919@gmail.com" className="flex items-center gap-1 hover:underline" style={{ color: ACCENT }}>
                <FiMail size={13} /> souravsharma191919@gmail.com
              </a>
              <a href="https://souravsharma.online" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: ACCENT }}>
                <FiGlobe size={13} /> Portfolio
              </a>
              <a href="https://linkedin.com/in/sourav-sharma" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: ACCENT }}>
                <FiLinkedin size={13} /> LinkedIn
              </a>
              <span className="flex items-center gap-1">
                <FiMapPin size={13} /> Himachal Pradesh, India
              </span>
            </div>
          </div>

          {/* Summary */}
          <SectionTitle>Summary</SectionTitle>
          <p className="text-gray-700">
            Experienced Full Stack Developer proficient in the MERN stack, Azure services, and Power BI.
            Skilled in building scalable applications with AI integration, real-time features, and data
            visualization. Passionate about delivering efficient solutions through proactive
            problem-solving and continuous learning.
          </p>

          {/* Experience */}
          <SectionTitle>Experience</SectionTitle>
          {experience.map((job) => (
            <div key={job.role} className="mb-4 last:mb-0">
              <EntryHeader left={job.role} right={job.date} subLeft={job.company} />
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700 marker:text-gray-400">
                {job.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Education */}
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.title} className="mb-3 last:mb-0">
              <EntryHeader left={edu.title} right={edu.date} subLeft={edu.sub} subRight={edu.right} />
            </div>
          ))}

          {/* Certifications */}
          <SectionTitle>Certifications</SectionTitle>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 marker:text-gray-400">
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          {/* Projects */}
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj) => (
            <div key={proj.name} className="mb-4 last:mb-0">
              <div className="flex justify-between items-baseline gap-4">
                <span className="font-bold text-gray-900">{proj.name}</span>
                <span className="italic text-gray-500 text-[13px] whitespace-nowrap">{proj.stack}</span>
              </div>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-700 marker:text-gray-400">
                {proj.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Technical Skills */}
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="space-y-1.5 text-gray-700">
            {skills.map(([label, value]) => (
              <p key={label}>
                <span className="font-bold text-gray-900">{label}</span> {value}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
