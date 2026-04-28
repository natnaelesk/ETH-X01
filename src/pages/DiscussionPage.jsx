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
    <div className="max-w-6xl  flex flex-col justify-end mx-auto p-6 bg-dark text-light rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-header text-primary font ">Discussion Panel</h2>

      {loading ? (
        <p className="text-center text-light">Loading comments...</p>
      ) : (
        <>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-col max-h-[55vh] overflow-y-auto mb-6 space-y-4"
          >
            {comments.length === 0 ? (
              <p className="text-center text-gray-400 italic">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map(({ id, userId, userName, photoURL, text, createdAt }) => (
                <div key={id} className="flex items-start space-x-4">
                  <Link to={`/profile/${userId}`}>
                    <img
                      src={photoURL || "https://www.gravatar.com/avatar/?d=mp&s=48"}
                      alt={userName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <div>
                    <Link
                      to={`/profile/${userId}`}
                      className="text-sm font-semibold hover:underline"
                    >
                      {userName}
                    </Link>
                    <p className="text-gray-300">{text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {createdAt?.toDate
                        ? createdAt.toDate().toLocaleString()
                        : "just now"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {user ? (
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                placeholder="Write your comment..."
                className="flex-grow border border-green-800 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                disabled={newComment.trim() === ""}
              >
                Post
              </button>
            </form>
          ) : (
            <p className="text-center text-gray-500 italic">
              Log in to join the discussion.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default DiscussionPanel;
