import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import GitHubStats from "./components/GitHubStats";
import Blog from "./components/Blog";
import Learning from "./components/Learning";
import Compiler from "./components/Compiler";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StarsCanvas from "./components/canvas/Stars";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import AuthModal from "./components/AuthModal";
import AdminPanel from "./components/AdminPanel";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function Layout({ children }) {
  return (
    <div className="relative z-0 bg-primary">
      <ScrollToTop />
      <CustomCursor />
      <AuthModal />
      <ScrollProgress />
      <div className="fixed inset-0 z-0">
        <StarsCanvas />
      </div>
      <Navbar />
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <GitHubStats />
      <Contact />
      <AdminPanel />
    </>
  );
}

function BlogPage() {
  return (
    <div className="pt-24">
      <Blog />
    </div>
  );
}

function LearningPage() {
  return (
    <div className="pt-24">
      <Learning />
    </div>
  );
}

function PlaygroundPage() {
  return (
    <div className="pt-24">
      <Compiler />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
      </Routes>
    </Layout>
  );
}
