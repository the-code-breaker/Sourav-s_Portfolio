import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { commentsApi } from "../api";
import {
  FiSend,
  FiEdit2,
  FiTrash2,
  FiCornerDownRight,
  FiLoader,
  FiMessageCircle,
  FiLogIn,
} from "react-icons/fi";

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

function UserAvatar({ name, color, size = "w-8 h-8" }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
      style={{ background: color }}
    >
      {initials}
    </div>
  );
}

function CommentItem({ comment, user, onDelete, onEdit, onReply }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [saving, setSaving] = useState(false);
  const isOwner = user && user.id === comment.user_id;
  const isAdmin = user?.is_admin;

  const handleSave = async () => {
    if (!editText.trim()) return;
    setSaving(true);
    try {
      await onEdit(comment.id, editText.trim());
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${comment.parent_id ? "ml-10 sm:ml-12" : ""}`}
    >
      <UserAvatar name={comment.user_name} color={comment.avatar_color} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white text-sm font-semibold">
            {comment.user_name}
          </span>
          <span className="text-secondary/40 text-[11px]">
            {timeAgo(comment.created_at)}
          </span>
          {comment.created_at !== comment.updated_at && (
            <span className="text-secondary/30 text-[10px]">(edited)</span>
          )}
        </div>

        {editing ? (
          <div className="mt-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-[#915EFF]/50"
              rows={2}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-3 py-1 rounded-lg bg-[#915EFF]/20 text-[#915EFF] text-xs font-medium hover:bg-[#915EFF]/30 transition-colors"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditText(comment.content);
                }}
                className="px-3 py-1 rounded-lg bg-white/5 text-secondary text-xs hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-secondary text-sm mt-1 break-words leading-relaxed">
            {comment.content}
          </p>
        )}

        {/* Actions */}
        {!editing && (
          <div className="flex items-center gap-3 mt-2">
            {user && !comment.parent_id && (
              <button
                onClick={() => onReply(comment)}
                className="flex items-center gap-1 text-secondary/50 text-[11px] hover:text-[#00cea8] transition-colors"
              >
                <FiCornerDownRight size={11} /> Reply
              </button>
            )}
            {isOwner && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-1 text-secondary/50 text-[11px] hover:text-[#915EFF] transition-colors"
                >
                  <FiEdit2 size={11} /> Edit
                </button>
                <button
                  onClick={() => onDelete(comment.id)}
                  className="flex items-center gap-1 text-secondary/50 text-[11px] hover:text-red-400 transition-colors"
                >
                  <FiTrash2 size={11} /> Delete
                </button>
              </>
            )}
            {!isOwner && isAdmin && (
              <button
                onClick={() => onDelete(comment.id)}
                className="flex items-center gap-1 text-secondary/50 text-[11px] hover:text-red-400 transition-colors"
                title="Delete as admin"
              >
                <FiTrash2 size={11} /> Delete
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function BlogComments({ blogId }) {
  const { user, openAuth } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [posting, setPosting] = useState(false);

  const fetchComments = useCallback(async () => {
    try {
      const data = await commentsApi.getByBlog(blogId);
      setComments(data);
    } catch {
      // API might not be running
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePost = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      await commentsApi.create({
        blog_id: blogId,
        content: newComment.trim(),
        parent_id: replyTo?.id || null,
      });
      setNewComment("");
      setReplyTo(null);
      await fetchComments();
    } catch (err) {
      alert(err.message);
    } finally {
      setPosting(false);
    }
  };

  const handleEdit = async (commentId, content) => {
    await commentsApi.update(commentId, { content });
    await fetchComments();
  };

  const handleDelete = async (commentId) => {
    await commentsApi.delete(commentId);
    await fetchComments();
  };

  // Group: top-level then replies
  const topLevel = comments.filter((c) => !c.parent_id);
  const replies = comments.filter((c) => c.parent_id);

  return (
    <div className="mt-8 pt-8 border-t border-white/5">
      <h4 className="text-white text-lg font-bold flex items-center gap-2 mb-6">
        <FiMessageCircle className="text-[#915EFF]" />
        Comments
        {comments.length > 0 && (
          <span className="text-secondary text-sm font-normal">
            ({comments.length})
          </span>
        )}
      </h4>

      {/* Comment input */}
      {user ? (
        <div className="mb-6">
          {replyTo && (
            <div className="flex items-center gap-2 mb-2 text-xs text-secondary">
              <FiCornerDownRight size={12} className="text-[#00cea8]" />
              Replying to{" "}
              <span className="text-white font-medium">{replyTo.user_name}</span>
              <button
                onClick={() => setReplyTo(null)}
                className="text-red-400 hover:text-red-300 ml-1"
              >
                ✕
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <UserAvatar
              name={user.name}
              color={user.avatar_color}
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={
                  replyTo ? `Reply to ${replyTo.user_name}...` : "Share your thoughts..."
                }
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm resize-none placeholder-secondary/40 focus:outline-none focus:border-[#915EFF]/50 transition-colors"
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handlePost();
                }}
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-secondary/30 text-[11px]">
                  Ctrl + Enter to post
                </span>
                <button
                  onClick={handlePost}
                  disabled={posting || !newComment.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-300 disabled:opacity-40"
                  style={{
                    background: "linear-gradient(135deg, #915EFF, #00cea8)",
                  }}
                >
                  {posting ? (
                    <FiLoader className="animate-spin" size={14} />
                  ) : (
                    <FiSend size={14} />
                  )}
                  {posting ? "Posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={openAuth}
          className="w-full mb-6 py-4 rounded-xl border border-dashed border-white/10 text-secondary text-sm hover:border-[#915EFF]/30 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <FiLogIn size={16} />
          Sign in to leave a comment
        </button>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="flex items-center justify-center py-8 text-secondary">
          <FiLoader className="animate-spin mr-2" /> Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <p className="text-secondary/40 text-sm text-center py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-5">
          <AnimatePresence>
            {topLevel.map((comment) => (
              <div key={comment.id}>
                <CommentItem
                  comment={comment}
                  user={user}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onReply={(c) => setReplyTo(c)}
                />
                {/* Replies */}
                {replies
                  .filter((r) => r.parent_id === comment.id)
                  .map((reply) => (
                    <div key={reply.id} className="mt-3">
                      <CommentItem
                        comment={reply}
                        user={user}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        onReply={() => {}}
                      />
                    </div>
                  ))}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
