import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contactApi } from "../api";
import { useAuth } from "../context/AuthContext";
import {
  FiMail,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiMessageSquare,
  FiShield,
  FiRefreshCw,
  FiInbox,
} from "react-icons/fi";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread | read
  const [deleting, setDeleting] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await contactApi.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.is_admin) {
      fetchContacts();
    }
  }, [user]);

  const handleMarkRead = async (id) => {
    try {
      await contactApi.markRead(id);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read: true } : c))
      );
    } catch {
      // silently fail
    }
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await contactApi.delete(id);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch {
      // silently fail
    } finally {
      setDeleting(null);
    }
  };

  if (!user?.is_admin) return null;

  const filtered = contacts.filter((c) => {
    if (filter === "unread") return !c.read;
    if (filter === "read") return c.read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <section id="admin" className="relative z-10 py-20">
      <span className="hash-span" id="admin">&nbsp;</span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center">
              <FiShield className="text-white" size={20} />
            </div>
            <div>
              <p className="text-secondary text-sm uppercase tracking-widest">
                Admin Panel
              </p>
              <h2 className="text-white font-black text-3xl sm:text-5xl mt-1">
                Contact <span className="gradient-text">Submissions</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Stats + Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="glass rounded-xl px-4 py-2 neon-border">
              <span className="text-secondary text-xs">Total</span>
              <p className="text-white font-bold text-lg">{contacts.length}</p>
            </div>
            <div className="glass rounded-xl px-4 py-2 neon-border">
              <span className="text-secondary text-xs">Unread</span>
              <p className="text-[#915EFF] font-bold text-lg">{unreadCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {["all", "unread", "read"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 capitalize ${
                  filter === f
                    ? "bg-gradient-to-r from-[#915EFF] to-[#00cea8] text-white shadow-lg shadow-[#915EFF]/25"
                    : "glass text-secondary hover:text-white neon-border"
                }`}
              >
                {f}
              </button>
            ))}

            <button
              onClick={fetchContacts}
              disabled={loading}
              className="p-2 rounded-xl glass neon-border text-secondary hover:text-white transition-colors disabled:opacity-50"
              title="Refresh"
            >
              <FiRefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="mt-6 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="w-8 h-8 border-2 border-[#915EFF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center py-16"
          >
            <FiInbox size={48} className="mx-auto text-secondary/40 mb-4" />
            <p className="text-secondary text-sm">
              {filter === "all"
                ? "No contact submissions yet."
                : `No ${filter} messages.`}
            </p>
          </motion.div>
        )}

        {/* Contact cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((contact, idx) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`glass rounded-2xl p-5 neon-border relative group ${
                  !contact.read ? "border-l-[3px] border-l-[#915EFF]" : ""
                }`}
              >
                {/* Unread badge */}
                {!contact.read && (
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-[#915EFF] animate-pulse" />
                )}

                {/* Name + Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#915EFF]/30 to-[#00cea8]/30 border border-[#915EFF]/20 flex items-center justify-center shrink-0">
                    <FiUser size={16} className="text-[#915EFF]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {contact.name}
                    </h3>
                    <p className="text-secondary text-xs flex items-center gap-1 mt-0.5">
                      <FiMail size={10} /> {contact.email}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-start gap-2">
                    <FiMessageSquare size={12} className="text-secondary mt-0.5 shrink-0" />
                    <p className="text-secondary text-xs leading-relaxed line-clamp-4">
                      {contact.message}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-secondary/60 text-[11px] flex items-center gap-1">
                    <FiClock size={10} /> {timeAgo(contact.created_at)}
                  </span>

                  <div className="flex items-center gap-1">
                    {!contact.read && (
                      <button
                        onClick={() => handleMarkRead(contact.id)}
                        className="p-1.5 rounded-lg text-secondary hover:text-green-400 hover:bg-green-400/10 transition-all text-xs"
                        title="Mark as read"
                      >
                        <FiCheckCircle size={14} />
                      </button>
                    )}
                    {contact.read && (
                      <span className="text-green-400/60 text-[11px] flex items-center gap-1 mr-1">
                        <FiCheckCircle size={10} /> Read
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(contact.id)}
                      disabled={deleting === contact.id}
                      className="p-1.5 rounded-lg text-secondary hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
