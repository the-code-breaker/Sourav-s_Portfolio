import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, about } from "../constants";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiSun, FiMoon, FiShield } from "react-icons/fi";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const { user, logout, openAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="w-full flex items-center py-4 fixed top-0 z-20 glass">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center font-bold text-white text-base">
            S
          </div>
          <p className="text-white text-[16px] font-bold cursor-pointer hidden sm:block">
            {about.name}
            <span className="text-[#915EFF] hidden xl:inline"> | </span>
            <span className="text-secondary text-xs hidden xl:inline">{about.title}</span>
          </p>
        </Link>

        {/* Desktop nav links */}
        <ul className="list-none hidden lg:flex flex-row items-center gap-4 xl:gap-5">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } hover:text-white text-[13px] font-medium cursor-pointer transition-colors duration-300 relative group whitespace-nowrap`}
              onClick={() => setActive(link.title)}
            >
              {link.path ? (
                <Link to={link.path}>{link.title}</Link>
              ) : (
                <a
                  href={location.pathname === "/" ? `#${link.id}` : `/#${link.id}`}
                  onClick={(e) => {
                    if (location.pathname !== "/") {
                      e.preventDefault();
                      navigate(`/#${link.id}`);
                    }
                  }}
                >
                  {link.title}
                </a>
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00cea8] group-hover:w-full transition-all duration-300" />
            </li>
          ))}
          {user?.is_admin && (
            <li
              className={`${
                active === "Admin" ? "text-white" : "text-[#915EFF]"
              } hover:text-white text-[13px] font-medium cursor-pointer transition-colors duration-300 relative group whitespace-nowrap flex items-center gap-1`}
              onClick={() => setActive("Admin")}
            >
              <FiShield size={12} />
              <a
                href={location.pathname === "/" ? "#admin" : "/#admin"}
                onClick={(e) => {
                  if (location.pathname !== "/") {
                    e.preventDefault();
                    navigate("/#admin");
                  }
                }}
              >
                Admin
              </a>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00cea8] group-hover:w-full transition-all duration-300" />
            </li>
          )}
        </ul>

        {/* Desktop: theme toggle + auth */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-secondary hover:text-white hover:bg-white/5 transition-all duration-300"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: user.avatar_color || '#915EFF' }}
                >
                  {user.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <span className="text-white text-sm font-medium hidden xl:block">{user.name?.split(' ')[0]}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-secondary hover:text-red-400 hover:bg-white/5 transition-all"
                title="Logout"
              >
                <FiLogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={openAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#915EFF]/25"
              style={{ background: 'linear-gradient(135deg, #915EFF, #00cea8)' }}
            >
              <FiUser size={14} /> Sign In
            </button>
          )}
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-secondary hover:text-white transition-all"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => setToggle(!toggle)}
            className="text-white text-2xl z-30"
          >
            {toggle ? <HiX /> : <HiMenu />}
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass p-6 absolute top-16 right-4 mx-4 my-2 min-w-[200px] z-20 rounded-2xl neon-border"
              >
                <ul className="list-none flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className={`${
                        active === link.title ? "text-white" : "text-secondary"
                      } font-medium cursor-pointer text-[15px] hover:text-white transition-colors`}
                      onClick={() => {
                        setToggle(false);
                        setActive(link.title);
                      }}
                    >
                      {link.path ? (
                        <Link to={link.path}>{link.title}</Link>
                      ) : (
                        <a
                          href={location.pathname === "/" ? `#${link.id}` : `/#${link.id}`}
                          onClick={(e) => {
                            if (location.pathname !== "/") {
                              e.preventDefault();
                              navigate(`/#${link.id}`);
                            }
                          }}
                        >
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}
                  {user?.is_admin && (
                    <li
                      className="text-[#915EFF] font-medium cursor-pointer text-[15px] hover:text-white transition-colors flex items-center gap-2"
                      onClick={() => {
                        setToggle(false);
                        setActive("Admin");
                      }}
                    >
                      <FiShield size={14} />
                      <a
                        href={location.pathname === "/" ? "#admin" : "/#admin"}
                        onClick={(e) => {
                          if (location.pathname !== "/") {
                            e.preventDefault();
                            navigate("/#admin");
                          }
                        }}
                      >
                        Admin
                      </a>
                    </li>
                  )}
                </ul>

                {/* Auth button (mobile) */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  {user ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: user.avatar_color || '#915EFF' }}
                        >
                          {user.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <span className="text-white text-sm">{user.name}</span>
                      </div>
                      <button
                        onClick={() => { logout(); setToggle(false); }}
                        className="text-secondary hover:text-red-400 transition-colors"
                      >
                        <FiLogOut size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { openAuth(); setToggle(false); }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #915EFF, #00cea8)' }}
                    >
                      <FiUser size={14} /> Sign In
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
