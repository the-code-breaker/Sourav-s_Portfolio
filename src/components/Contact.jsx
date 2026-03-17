import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlobeCanvas from "./canvas/Globe";
import { about } from "../constants";
import { contactApi } from "../api";
import {
  FiSend,
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

export default function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await contactApi.submit(form);
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20">
      <span className="hash-span" id="contact">&nbsp;</span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Get in touch
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Contact <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8 neon-border"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What's your name?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-[#915EFF]/20 text-white placeholder:text-secondary/50 focus:outline-none focus:border-[#915EFF]/60 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="What's your email?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-[#915EFF]/20 text-white placeholder:text-secondary/50 focus:outline-none focus:border-[#915EFF]/60 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What do you want to say?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#050816]/80 border border-[#915EFF]/20 text-white placeholder:text-secondary/50 focus:outline-none focus:border-[#915EFF]/60 transition-colors resize-none text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#915EFF] to-[#00cea8] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#915EFF]/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3"
                  >
                    <FiCheckCircle size={16} />
                    Thank you! Your message has been received.
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                  >
                    <FiAlertCircle size={16} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-secondary text-sm">
                <FiMail className="text-[#915EFF]" />
                <span>{about.email}</span>
              </div>
              <div className="flex items-center gap-3 text-secondary text-sm">
                <FiMapPin className="text-[#00cea8]" />
                <span>{about.location}</span>
              </div>
              <div className="flex gap-3 mt-4">
                <a
                  href={about.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center text-secondary hover:text-white transition-colors"
                >
                  <FiGithub />
                </a>
                <a
                  href={about.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass neon-border flex items-center justify-center text-secondary hover:text-white transition-colors"
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>
          </motion.div>

          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block h-[500px] rounded-2xl overflow-hidden"
          >
            <GlobeCanvas />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
