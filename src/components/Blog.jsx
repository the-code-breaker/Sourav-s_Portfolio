import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, blogCategories } from "../constants";
import { FiClock, FiCalendar, FiArrowRight, FiBookmark, FiArrowLeft } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import BlogComments from "./BlogComments";
import { likesApi } from "../api";
import { useAuth } from "../context/AuthContext";

function LikeButton({ blogId, count: initialCount, liked: initialLiked, onUpdate }) {
  const { user, openAuth } = useAuth();
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setCount(initialCount);
    setLiked(initialLiked);
  }, [initialCount, initialLiked]);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (!user) {
      openAuth();
      return;
    }
    try {
      setAnimating(true);
      const res = await likesApi.toggle(blogId);
      setCount(res.count);
      setLiked(res.liked);
      onUpdate?.(blogId, res.count, res.liked);
    } catch {
      // silently fail
    } finally {
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-300 ${
        liked
          ? "text-pink-500"
          : "text-secondary hover:text-pink-400"
      }`}
    >
      <motion.span
        animate={animating ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="inline-flex"
      >
        {liked ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          <FiHeart size={14} />
        )}
      </motion.span>
      {count > 0 && <span>{count}</span>}
    </button>
  );
}

function FeaturedPost({ post, onSelect, likeData, onLikeUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={onSelect}
      className="glass rounded-2xl neon-border overflow-hidden group cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 lg:h-full overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/80 via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent lg:hidden" />

          {/* Featured badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#915EFF] to-[#00cea8] rounded-full text-white">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-secondary text-xs mb-4">
            <span className="px-2 py-1 rounded-md bg-[#915EFF]/20 text-[#915EFF] font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar size={12} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={12} /> {post.readTime}
            </span>
          </div>

          <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight group-hover:text-[#915EFF] transition-colors duration-300">
            {post.title}
          </h3>

          <p className="text-secondary text-sm mt-4 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-1 rounded-full border border-[#915EFF]/20 text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#00cea8] text-sm font-medium group-hover:gap-3 transition-all duration-300">
              Read Article <FiArrowRight />
            </div>
            <LikeButton
              blogId={post.id}
              count={likeData?.count || 0}
              liked={likeData?.liked || false}
              onUpdate={onLikeUpdate}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ post, index, onClick, likeData, onLikeUpdate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      onClick={onClick}
      className="glass rounded-2xl neon-border overflow-hidden card-hover group cursor-pointer flex flex-col"
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

        {/* Bookmark */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center text-white hover:text-[#915EFF] transition-colors">
          <FiBookmark size={14} />
        </button>

        {/* Category pill */}
        <div className="absolute bottom-3 left-4">
          <span className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md bg-[#915EFF]/30 text-[#915EFF] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-secondary text-[11px] mb-3">
          <span className="flex items-center gap-1">
            <FiCalendar size={11} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={11} /> {post.readTime}
          </span>
        </div>

        <h3 className="text-white text-lg font-bold leading-snug group-hover:text-[#915EFF] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-secondary text-[13px] mt-3 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-[#915EFF]/15 text-secondary/70"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#00cea8] text-xs font-medium group-hover:gap-3 transition-all duration-300">
            Read more <FiArrowRight size={12} />
          </div>
          <LikeButton
            blogId={post.id}
            count={likeData?.count || 0}
            liked={likeData?.liked || false}
            onUpdate={onLikeUpdate}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState(null);
  const [likesData, setLikesData] = useState({});

  const fetchLikes = useCallback(async () => {
    try {
      const res = await likesApi.batch();
      const mapped = {};
      for (const [blogId, count] of Object.entries(res.counts)) {
        mapped[blogId] = { count, liked: res.user_likes.includes(Number(blogId)) };
      }
      setLikesData(mapped);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  const handleLikeUpdate = (blogId, count, liked) => {
    setLikesData((prev) => ({ ...prev, [blogId]: { count, liked } }));
  };

  const featuredPosts = blogPosts.filter((p) => p.featured);
  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  // Expanded single-post view
  if (selectedPost) {
    return (
      <section id="blog" className="relative z-10 py-20">
        <span className="hash-span" id="blog">&nbsp;</span>
        <div className="max-w-4xl mx-auto px-6 sm:px-16">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-secondary hover:text-white transition-colors mb-8 text-sm"
          >
            <FiArrowLeft size={16} /> Back to all posts
          </motion.button>

          {/* Post cover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden mb-8"
          >
            <img
              src={selectedPost.cover}
              alt={selectedPost.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          </motion.div>

          {/* Post meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 text-secondary text-xs mb-4">
              <span className="px-2 py-1 rounded-md bg-[#915EFF]/20 text-[#915EFF] font-semibold">
                {selectedPost.category}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar size={12} /> {selectedPost.date}
              </span>
              <span className="flex items-center gap-1">
                <FiClock size={12} /> {selectedPost.readTime}
              </span>
            </div>

            <h2 className="text-white font-black text-2xl sm:text-4xl leading-tight">
              {selectedPost.title}
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-1 rounded-full border border-[#915EFF]/20 text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <LikeButton
                blogId={selectedPost.id}
                count={likesData[selectedPost.id]?.count || 0}
                liked={likesData[selectedPost.id]?.liked || false}
                onUpdate={handleLikeUpdate}
              />
            </div>

            <div className="mt-8 text-secondary text-sm leading-relaxed whitespace-pre-line">
              {selectedPost.excerpt}
            </div>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <BlogComments blogId={selectedPost.id} />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative z-10 py-20">
      <span className="hash-span" id="blog">
        &nbsp;
      </span>
      <div className="max-w-7xl mx-auto px-6 sm:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary text-sm uppercase tracking-widest">
            Insights & Ideas
          </p>
          <h2 className="text-white font-black text-3xl sm:text-5xl mt-2">
            Blog <span className="gradient-text">Posts</span>
          </h2>
          <p className="text-secondary text-sm mt-4 max-w-2xl leading-relaxed">
            Sharing what I learn — from deep technical dives to career
            reflections. Think of it as my digital garden.
          </p>
        </motion.div>

        {/* Featured post (first featured) */}
        {featuredPosts.length > 0 && (
          <div className="mt-12">
            <FeaturedPost post={featuredPosts[0]} onSelect={() => setSelectedPost(featuredPosts[0])} likeData={likesData[featuredPosts[0].id]} onLikeUpdate={handleLikeUpdate} />
          </div>
        )}

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-2"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#915EFF] to-[#00cea8] text-white shadow-lg shadow-[#915EFF]/25"
                  : "glass text-secondary hover:text-white neon-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Posts grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} onClick={() => setSelectedPost(post)} likeData={likesData[post.id]} onLikeUpdate={handleLikeUpdate} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-secondary text-center mt-16 text-sm"
          >
            No posts in this category yet. Stay tuned!
          </motion.p>
        )}
      </div>
    </section>
  );
}
