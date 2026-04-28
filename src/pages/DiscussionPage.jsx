import React, { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useAuth } from "../app/useAuth";

const DiscussionPanel = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const isUserAtBottom = useRef(true);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "discussion"), orderBy("createdAt", "asc"));

    const unsubscribeComments = onSnapshot(
      q,
      async (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setComments(commentsData);
        setLoading(false);

        if (commentsData.length === 0) {
          await addDoc(collection(db, "discussion"), {
            userId: "system",
            userName: "System",
            photoURL: "",
            text: "Welcome! Be the first to comment here.",
            createdAt: serverTimestamp(),
          });
        }
      },
      (error) => {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeComments();
    };
  }, []);

  // Detect if user is at bottom before update
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const atBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 10;
    isUserAtBottom.current = atBottom;
  };

  // Auto-scroll to bottom only if user was at bottom before
  useEffect(() => {
    const container = scrollRef.current;
    if (container && isUserAtBottom.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to comment.");
    if (newComment.trim() === "") return;

    await addDoc(collection(db, "discussion"), {
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      photoURL: user.photoURL || "",
      text: newComment.trim(),
      createdAt: serverTimestamp(),
    });

    setNewComment("");
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="neo-panel bg-white p-6 sm:p-8">
        <p className="neo-kicker bg-[#FFD93D]">Community</p>
        <h1 className="neo-display mt-4 text-4xl sm:text-5xl">Discussion</h1>
        <p className="mt-3 max-w-2xl text-sm font-bold leading-7 text-black sm:text-base">
          A simple discussion board for now. Ask questions, share progress, and help others move forward.
        </p>
      </div>

      {loading ? (
        <div className="neo-panel mt-6 bg-[#C4B5FD] p-6 text-black">
          <p className="text-sm font-black uppercase tracking-[0.22em]">Loading</p>
          <p className="mt-2 text-base font-bold">Fetching comments…</p>
        </div>
      ) : (
        <>
          <div className="neo-panel mt-6 bg-[#FFFDF5] p-4">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex max-h-[55vh] flex-col space-y-4 overflow-y-auto"
            >
            {comments.length === 0 ? (
              <p className="text-center text-sm font-bold text-black">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map(({ id, userId, userName, photoURL, text, createdAt }) => (
                <div key={id} className="border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000]">
                  <div className="flex items-start gap-4">
                  <Link to={`/profile/${userId}`}>
                    <img
                      src={photoURL || "https://www.gravatar.com/avatar/?d=mp&s=48"}
                      alt={userName}
                      className="h-12 w-12 rounded-full border-4 border-black object-cover"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${userId}`}
                      className="text-sm font-black uppercase text-black hover:underline"
                    >
                      {userName}
                    </Link>
                    <p className="mt-2 text-sm font-bold leading-7 text-black">{text}</p>
                    <p className="mt-2 text-xs font-bold text-black/70">
                      {createdAt?.toDate
                        ? createdAt.toDate().toLocaleString()
                        : "just now"}
                    </p>
                  </div>
                  </div>
                </div>
              ))
            )}
            </div>
          </div>

          {user ? (
            <form onSubmit={handleSubmit} className="neo-panel mt-6 flex gap-2 bg-white p-4">
              <input
                type="text"
                placeholder="Write your comment..."
                className="neo-focus-ring h-12 flex-1 border-4 border-black bg-[#FFFDF5] px-4 text-sm font-bold text-black placeholder:text-black/50 shadow-[4px_4px_0px_0px_#000] focus:bg-[#FFD93D]"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="neo-button"
                disabled={newComment.trim() === ""}
              >
                Post
              </button>
            </form>
          ) : (
            <div className="neo-panel mt-6 bg-[#FFD93D] p-6 text-black">
              <p className="text-sm font-bold">
                Log in to join the discussion. You can still browse freely.
              </p>
              <div className="mt-4">
                <Link className="neo-button-ghost inline-flex" to="/login">
                  Login
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DiscussionPanel;
