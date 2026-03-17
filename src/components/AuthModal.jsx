import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiLoader } from "react-icons/fi";

export default function AuthModal() {
  const { showAuth, closeAuth, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.name, form.email, form.password);
      }
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <AnimatePresence>
      {showAuth && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuth}
            className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[901] flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl neon-border w-full max-w-md p-8 relative overflow-hidden">
              {/* Decorative gradient blob */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#915EFF]/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#00cea8]/20 blur-3xl" />

              {/* Close */}
              <button
                onClick={closeAuth}
                className="absolute top-4 right-4 text-secondary hover:text-white transition-colors z-10"
              >
                <FiX size={20} />
              </button>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center mb-4">
                    <FiUser size={24} className="text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h3>
                  <p className="text-secondary text-sm mt-1">
                    {isLogin
                      ? "Sign in to leave comments on blog posts"
                      : "Join the community and share your thoughts"}
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name (signup only) */}
                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <label className="text-secondary text-xs font-medium mb-1 block">
                          Full Name
                        </label>
                        <div className="relative">
                          <FiUser
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50"
                          />
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required={!isLogin}
                            minLength={2}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-secondary/40 focus:outline-none focus:border-[#915EFF]/50 transition-colors"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div>
                    <label className="text-secondary text-xs font-medium mb-1 block">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-secondary/40 focus:outline-none focus:border-[#915EFF]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-secondary text-xs font-medium mb-1 block">
                      Password
                    </label>
                    <div className="relative">
                      <FiLock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Min 6 characters"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-secondary/40 focus:outline-none focus:border-[#915EFF]/50 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-white transition-colors"
                      >
                        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, #915EFF, #00cea8)",
                      boxShadow: "0 0 20px rgba(145,94,255,0.3)",
                    }}
                  >
                    {loading ? (
                      <>
                        <FiLoader className="animate-spin" size={16} />
                        {isLogin ? "Signing in..." : "Creating account..."}
                      </>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                {/* Toggle */}
                <p className="text-secondary text-sm text-center mt-6">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    onClick={switchMode}
                    className="text-[#915EFF] font-semibold hover:text-[#00cea8] transition-colors"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
