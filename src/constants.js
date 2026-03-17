import profileImg from "./assets/profile.jpg";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "blog", title: "Blog", path: "/blog" },
  { id: "learning", title: "Learning", path: "/learning" },
  { id: "compiler", title: "Playground", path: "/playground" },
  { id: "contact", title: "Contact" },
];

export const about = {
  name: "Sourav Sharma",
  title: "Full Stack Developer",
  summary:
    "Results-driven Full Stack Developer with 1.5+ years of professional experience specializing in MERN stack, Azure cloud services, and data engineering. Proven expertise in building scalable web applications, AI-powered solutions, and real-time systems.",
  email: "souravsharma191919@gmail.com",
  location: "Himachal Pradesh, India",
  github: "https://github.com/the-code-breaker",
  linkedin: "https://www.linkedin.com/in/thecodebreaker/",
  profileImage: profileImg,
};

export const experiences = [
  {
    title: "Software Engineer I",
    company: "MAQ Software",
    location: "Noida, India",
    date: "September 2025 – Present",
    icon: "🚀",
    iconBg: "#151030",
    points: [
      "Engineered an AI-powered natural language to SQL query generator using Agent AI architecture, reducing query development time by 65% for business analysts.",
      "Constructed scalable backend with FastAPI and integrated Azure OpenAI GPT-4 models for intelligent query generation and optimization.",
      "Built responsive React frontend with real-time query suggestions and visualization dashboard.",
    ],
  },
  {
    title: "Associate Software Engineer",
    company: "MAQ Software",
    location: "Noida, India",
    date: "September 2024 – August 2025",
    icon: "💻",
    iconBg: "#151030",
    points: [
      "Created enterprise-grade data extraction system for Power BI Row-Level Security (RLS) reports using DAX queries and XMLA endpoints.",
      "Executed SAX streaming approach for Excel export functionality, reducing memory usage by 70% and improving performance for large datasets.",
      "Produced custom Power BI hierarchical slicer visual using TypeScript and React with advanced features including search, multi-level filtering, and virtualization.",
    ],
  },
];

export const skills = [
  {
    category: "Programming Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "SQL"],
  },
  {
    category: "Frontend Development",
    items: [
      "React.js",
      "Next.js",
      "Vite.js",
      "Redux",
      "Material-UI",
      "Chakra UI",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend Development",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "RESTful API",
      "Socket.IO",
      "Microservices",
    ],
  },
  {
    category: "Databases & Storage",
    items: ["MongoDB", "Databricks", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "Microsoft Azure",
      "Azure DevOps",
      "Docker",
      "Vercel",
      "Render",
      "Heroku",
    ],
  },
  {
    category: "AI/ML Technologies",
    items: ["Azure OpenAI", "Agent AI"],
  },
  {
    category: "Data & BI Tools",
    items: ["Power BI", "ETL Processes", "Data Visualization"],
  },
];

export const projects = [
  {
    name: "AI Query Generator",
    description:
      "An AI-powered natural language to SQL query generator using Agent AI architecture. Reduces query development time by 65% for business analysts with intelligent suggestions.",
    tags: [
      { name: "FastAPI", color: "text-[#00cea8]" },
      { name: "Azure OpenAI", color: "text-[#915EFF]" },
      { name: "React", color: "text-[#61dafb]" },
    ],
    image: "https://via.placeholder.com/600x340/151030/915EFF?text=AI+Query+Generator",
    link: "#",
  },
  {
    name: "Youth Organization Platform",
    description:
      "A comprehensive platform serving 500+ users with role-based access control (RBAC), financial tracking, and automated reporting. Secure auth using JWT and OAuth 2.0.",
    tags: [
      { name: "React", color: "text-[#61dafb]" },
      { name: "Node.js", color: "text-[#68a063]" },
      { name: "MongoDB", color: "text-[#00ed64]" },
      { name: "Docker", color: "text-[#2496ed]" },
    ],
    image: "https://via.placeholder.com/600x340/151030/00cea8?text=Youth+Org+Platform",
    link: "#",
  },
  {
    name: "Enterprise Carpooling Platform",
    description:
      "Full-stack ride-sharing application with real-time tracking, route optimization, and secure payment processing. Google Maps API integration reduced commute time by 25%.",
    tags: [
      { name: "MERN Stack", color: "text-[#00cea8]" },
      { name: "Google Maps", color: "text-[#ea4335]" },
      { name: "Razorpay", color: "text-[#3395ff]" },
      { name: "WebSocket", color: "text-[#915EFF]" },
    ],
    image: "https://via.placeholder.com/600x340/151030/bf61ff?text=Carpooling+Platform",
    link: "#",
  },
  {
    name: "Real-time Chat Application",
    description:
      "Scalable messaging platform supporting 1000+ concurrent users with WebSocket technology. Redis message queuing reduced latency by 60%. End-to-end encryption for security.",
    tags: [
      { name: "Socket.IO", color: "text-[#00cea8]" },
      { name: "Redis", color: "text-[#dc382d]" },
      { name: "MongoDB", color: "text-[#00ed64]" },
      { name: "Node.js", color: "text-[#68a063]" },
    ],
    image: "https://via.placeholder.com/600x340/151030/61dafb?text=Chat+Application",
    link: "#",
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Chitkara University Institute of Engineering and Technology",
    location: "Rajpura, Punjab",
    date: "Aug 2021 – June 2025",
    gpa: "9.12/10",
  },
  {
    degree: "Senior Secondary Education (HPBOSE)",
    institution: "DAV Public School Gohar",
    location: "Mandi, Himachal Pradesh",
    date: "April 2021",
    gpa: "",
  },
];

export const certifications = [
  {
    name: "Microsoft Fabric Analytics Engineer Associate (DP-600)",
    year: "2024",
    issuer: "Microsoft",
  },
  {
    name: "Microsoft Azure Data Engineer Associate (DP-700)",
    year: "2024",
    issuer: "Microsoft",
  },
];

export const achievements = [
  "Solved 500+ Data Structures and Algorithms problems across LeetCode, GeeksforGeeks, and HackerRank",
];

// ── GitHub Config ───────────────────────────────────────────
export const githubUsername = "the-code-breaker";

// ── Blog Posts ──────────────────────────────────────────────
export const blogCategories = [
  "All",
  "React",
  "JavaScript",
  "Azure",
  "System Design",
  "DSA",
  "Career",
];

export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Modern Patterns",
    excerpt:
      "Explore advanced React patterns like compound components, render props, and custom hooks that make your codebase maintainable at scale.",
    category: "React",
    date: "March 10, 2026",
    readTime: "8 min read",
    cover: "https://via.placeholder.com/800x400/151030/915EFF?text=React+Patterns",
    tags: ["React", "Architecture", "Hooks"],
    featured: true,
  },
  {
    id: 2,
    title: "Azure OpenAI + FastAPI: Building an AI-Powered Query Engine",
    excerpt:
      "A deep dive into how I built a natural language to SQL generator using Azure OpenAI GPT-4 and Agent AI architecture at MAQ Software.",
    category: "Azure",
    date: "February 22, 2026",
    readTime: "12 min read",
    cover: "https://via.placeholder.com/800x400/151030/00cea8?text=Azure+OpenAI",
    tags: ["Azure", "AI", "FastAPI", "Python"],
    featured: true,
  },
  {
    id: 3,
    title: "Mastering JavaScript Closures and the Event Loop",
    excerpt:
      "Understanding closures, the call stack, and the event loop is essential for writing performant async JavaScript. Here's everything you need to know.",
    category: "JavaScript",
    date: "February 5, 2026",
    readTime: "10 min read",
    cover: "https://via.placeholder.com/800x400/151030/bf61ff?text=JS+Deep+Dive",
    tags: ["JavaScript", "Fundamentals", "Async"],
    featured: false,
  },
  {
    id: 4,
    title: "System Design: Real-Time Chat at Scale with WebSockets",
    excerpt:
      "How I designed a chat system supporting 1000+ concurrent users using Socket.IO, Redis pub/sub, and horizontal scaling strategies.",
    category: "System Design",
    date: "January 18, 2026",
    readTime: "15 min read",
    cover: "https://via.placeholder.com/800x400/151030/61dafb?text=System+Design",
    tags: ["System Design", "WebSocket", "Redis"],
    featured: true,
  },
  {
    id: 5,
    title: "500+ DSA Problems Later: Patterns That Click",
    excerpt:
      "After solving 500+ problems on LeetCode and GFG, here are the recurring patterns and mental models that made problem-solving intuitive.",
    category: "DSA",
    date: "January 3, 2026",
    readTime: "11 min read",
    cover: "https://via.placeholder.com/800x400/151030/f59e0b?text=DSA+Patterns",
    tags: ["DSA", "LeetCode", "Algorithms"],
    featured: false,
  },
  {
    id: 6,
    title: "From College to MAQ Software: My Journey as a Developer",
    excerpt:
      "Reflections on transitioning from a CS student at Chitkara University to a full-time software engineer — what I wish I knew earlier.",
    category: "Career",
    date: "December 15, 2025",
    readTime: "6 min read",
    cover: "https://via.placeholder.com/800x400/151030/f472b6?text=Career+Journey",
    tags: ["Career", "Advice", "Growth"],
    featured: false,
  },
];

// ── Learning Courses ────────────────────────────────────────
export const learningCourses = [
  {
    id: "react",
    title: "React — The Complete Guide",
    description:
      "Master React from the ground up — JSX, hooks, state management, routing, performance optimization, and real-world project patterns.",
    icon: "⚛️",
    color: "#61dafb",
    totalLessons: 42,
    difficulty: "Beginner to Advanced",
    modules: [
      {
        title: "Getting Started with React",
        lessons: [
          { title: "What is React & Why Use It?", duration: "12 min", type: "article" },
          { title: "Setting Up Your Dev Environment (Vite + React)", duration: "8 min", type: "article" },
          { title: "Understanding JSX — HTML in JavaScript", duration: "15 min", type: "article" },
          { title: "Your First Component", duration: "10 min", type: "project" },
        ],
      },
      {
        title: "Components & Props",
        lessons: [
          { title: "Functional vs Class Components", duration: "10 min", type: "article" },
          { title: "Props — Passing Data Between Components", duration: "12 min", type: "article" },
          { title: "Children Props & Composition", duration: "8 min", type: "article" },
          { title: "Build a Reusable Card Component", duration: "15 min", type: "project" },
        ],
      },
      {
        title: "State & Lifecycle",
        lessons: [
          { title: "useState — Managing Component State", duration: "14 min", type: "article" },
          { title: "useEffect — Side Effects & Lifecycle", duration: "16 min", type: "article" },
          { title: "Conditional Rendering Patterns", duration: "10 min", type: "article" },
          { title: "Lists, Keys & Dynamic Rendering", duration: "12 min", type: "article" },
          { title: "Build a Todo App", duration: "20 min", type: "project" },
        ],
      },
      {
        title: "Advanced Hooks",
        lessons: [
          { title: "useRef — DOM Access & Mutable Values", duration: "10 min", type: "article" },
          { title: "useMemo & useCallback — Performance", duration: "14 min", type: "article" },
          { title: "useReducer — Complex State Logic", duration: "12 min", type: "article" },
          { title: "Custom Hooks — Reusable Logic", duration: "15 min", type: "article" },
          { title: "Build a Custom useFetch Hook", duration: "12 min", type: "project" },
        ],
      },
      {
        title: "State Management",
        lessons: [
          { title: "Context API — Global State Without Libraries", duration: "14 min", type: "article" },
          { title: "Redux Toolkit — Modern Redux", duration: "18 min", type: "article" },
          { title: "Zustand — Lightweight Alternative", duration: "10 min", type: "article" },
          { title: "Build a Shopping Cart with Context", duration: "20 min", type: "project" },
        ],
      },
      {
        title: "Routing & Navigation",
        lessons: [
          { title: "React Router v6 — Setup & Basics", duration: "12 min", type: "article" },
          { title: "Dynamic Routes & URL Parameters", duration: "10 min", type: "article" },
          { title: "Protected Routes & Auth Guards", duration: "14 min", type: "article" },
          { title: "Build a Multi-Page Dashboard", duration: "25 min", type: "project" },
        ],
      },
      {
        title: "Performance & Patterns",
        lessons: [
          { title: "React.memo & Reconciliation", duration: "12 min", type: "article" },
          { title: "Code Splitting & Lazy Loading", duration: "10 min", type: "article" },
          { title: "Error Boundaries", duration: "8 min", type: "article" },
          { title: "Compound Components Pattern", duration: "14 min", type: "article" },
          { title: "Build a Production-Ready Portfolio", duration: "30 min", type: "project" },
        ],
      },
    ],
  },
];

// ── Code Playground / Compiler ──────────────────────────────
export const compilerLanguages = [
  {
    id: "javascript",
    label: "JavaScript",
    icon: "⚡",
    color: "#f7df1e",
    pistonLang: "javascript",
    pistonVersion: "18.15.0",
    defaultCode: `// 🚀 JavaScript Playground
// Try editing and running this code!

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci Sequence (first 10):");
for (let i = 0; i < 10; i++) {
  process.stdout.write(fibonacci(i) + " ");
}
console.log("\\n");

// Array methods
const nums = [1, 2, 3, 4, 5];
const squared = nums.map(n => n ** 2);
console.log("Squared:", squared);

// Destructuring & template literals
const dev = { name: "Sourav", role: "Full Stack Dev" };
const { name, role } = dev;
console.log(\`Hello, I'm \${name} — a \${role}!\`);
`,
  },
  {
    id: "python",
    label: "Python",
    icon: "🐍",
    color: "#3776ab",
    pistonLang: "python",
    pistonVersion: "3.10.0",
    defaultCode: `# 🐍 Python Playground
# Try editing and running this code!

def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print("Fibonacci Sequence (first 10):")
print(list(fibonacci(10)))

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")

# Dictionary
dev = {"name": "Sourav", "role": "Full Stack Dev"}
print(f"Hello, I'm {dev['name']} — a {dev['role']}!")

# Lambda & filter
nums = range(1, 21)
evens = list(filter(lambda x: x % 2 == 0, nums))
print(f"Even numbers 1-20: {evens}")
`,
  },
  {
    id: "java",
    label: "Java",
    icon: "☕",
    color: "#ed8b00",
    pistonLang: "java",
    pistonVersion: "15.0.2",
    defaultCode: `// ☕ Java Playground
// Try editing and running this code!

public class Main {
    // Fibonacci using dynamic programming
    static int fibonacci(int n) {
        if (n <= 1) return n;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }

    public static void main(String[] args) {
        System.out.println("Fibonacci Sequence (first 10):");
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();

        // Array operations
        int[] nums = {1, 2, 3, 4, 5};
        System.out.print("Doubled: ");
        for (int n : nums) {
            System.out.print((n * 2) + " ");
        }
        System.out.println();

        String name = "Sourav";
        System.out.println("Hello, I'm " + name + " — a Full Stack Dev!");
    }
}
`,
  },
  {
    id: "cpp",
    label: "C++",
    icon: "⚙️",
    color: "#00599c",
    pistonLang: "c++",
    pistonVersion: "10.2.0",
    defaultCode: `// ⚙️ C++ Playground
// Try editing and running this code!

#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}

int main() {
    cout << "Fibonacci Sequence (first 10):" << endl;
    for (int i = 0; i < 10; i++)
        cout << fibonacci(i) << " ";
    cout << endl;

    // Vectors & STL
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    sort(nums.begin(), nums.end());
    cout << "Sorted: ";
    for (int n : nums) cout << n << " ";
    cout << endl;

    string name = "Sourav";
    cout << "Hello, I'm " + name + " — a Full Stack Dev!" << endl;

    return 0;
}
`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: "🔷",
    color: "#3178c6",
    pistonLang: "typescript",
    pistonVersion: "5.0.3",
    defaultCode: `// 🔷 TypeScript Playground
// Try editing and running this code!

interface Developer {
  name: string;
  role: string;
  skills: string[];
}

function greet(dev: Developer): string {
  return \`Hello, I'm \${dev.name} — a \${dev.role}!\`;
}

const sourav: Developer = {
  name: "Sourav",
  role: "Full Stack Dev",
  skills: ["React", "Node.js", "TypeScript", "Azure"]
};

console.log(greet(sourav));
console.log("Skills:", sourav.skills.join(", "));

// Generics
function reverseArray<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

const numbers = [1, 2, 3, 4, 5];
console.log("Reversed:", reverseArray(numbers));
console.log("Reversed skills:", reverseArray(sourav.skills));
`,
  },
];
