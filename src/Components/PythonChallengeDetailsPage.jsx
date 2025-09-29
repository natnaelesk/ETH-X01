// PythonChallengeDetailsPage.jsx - 2025 DARK PURPLE UI
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../Firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  increment,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";

const PythonChallengeDetailsPage = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const getEmbedUrl = (url) => {
  if (!url) return "";
  const videoIdMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
};
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const docRef = doc(db, "pythonChallenges", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setChallenge({ id: docSnap.id, ...data });
          setComments(data.comments ? [...data.comments].sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds) : []);
        } else {
          setMessage("Challenge not found");
        }

      } catch (err) {
        console.error("Error:", err);
        setMessage("Error loading challenge");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async (challengeId) => {
      try {
        const commentsQuery = query(
          collection(db, `pythonChallenges/${challengeId}/comments`),
          orderBy("timestamp", "desc")
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        setComments(commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    const fetchUser = () => {
      onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
    };

    fetchChallenge();
    fetchUser();
  }, [id]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please write some code first");
      return;
    }

    if (!user) {
      alert("Please log in to submit");
      return;
    }

    try {
      setMessage("Submitting...");
      
      await addDoc(collection(db, `pythonChallenges/${challenge.id}/submissions`), {
        userId: user.uid,
        userName: user.displayName,
        photoURL: user.photoURL,
        code: code.trim(),
        explanation: explanation.trim(),
        timestamp: new Date(),
      });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        score: increment(30),
      });

      setCode("");
      setExplanation("");
      setMessage("✅ Solution submitted! +30 points");
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Submission error:", err);
      setMessage("❌ Failed to submit");
    }
  };

const handleCommentSubmit = async () => {
  if (!newComment.trim() || !user) return;

  try {
    const challengeRef = doc(db, "pythonChallenges", challenge.id);

    await updateDoc(challengeRef, {
      comments: arrayUnion({
        userId: user.uid,
        userName: user.displayName,
        photoURL: user.photoURL,
        text: newComment.trim(),
        timestamp: new Date(),
      }),
    });

    // Update local state immediately
    setComments(prev => [
      {
        userId: user.uid,
        userName: user.displayName,
        photoURL: user.photoURL,
        text: newComment.trim(),
        timestamp: new Date(),
      },
      ...prev,
    ]);

    setNewComment("");
  } catch (err) {
    console.error("Error posting comment:", err);
  }
};


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🐍</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Loading Challenge</h2>
          <p className="text-purple-300">Preparing your learning experience...</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔮</div>
          <h2 className="text-2xl font-bold text-white mb-4">Challenge Not Found</h2>
          <button 
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      {/* Consistent Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900/50 to-black/50"></div>
      
      {/* Header Section */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-3 bg-purple-800/50 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-purple-500/30">
          <span className="text-2xl">🐍</span>
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            DAY {challenge.day}
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 bg-clip-text text-transparent">
          {challenge.title}
        </h1>
        
        <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
          {challenge.shortDescription}
        </p>
      </div>

     <div className="relative max-w-4xl mx-auto px-4 mb-12">
  <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
    
    {/* Video Tutorial */}
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
        <span className="text-2xl">🎬</span>
      </div>
      <h2 className="text-2xl font-bold">Video Tutorial</h2>
    </div>

    <div className="aspect-video bg-black rounded-2xl overflow-hidden border-2 border-purple-500/50 mb-8">
      <iframe
        className="w-full h-full"
        src={getEmbedUrl(challenge.youtubeLink)}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        />
      {console.log(challenge.youtubeLink)}
    </div>

    {/* Notepad / Notes Section */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
        <span className="text-2xl">📝</span>
      </div>
      <h2 className="text-2xl font-bold">Notes</h2>
    </div>

    <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 rounded-2xl p-6 border border-green-500/30">
      <p className="text-green-300 mb-4">
        Review the step-by-step notes and explanations for{" "}
        <span className="font-semibold">{challenge.topic}</span>.
      </p>
      <a
        href={challenge.notebookLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-all duration-200 shadow-lg"
      >
        📖 Open Notes
      </a>
    </div>

  </div>
</div>


      {/* Learning Content Section */}
      <div className="relative max-w-4xl mx-auto px-4 mb-12">
        <div className="grid gap-8">
          {/* Learning Objectives */}
          <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold">Learning Objectives</h2>
            </div>
            <p className="text-purple-200 leading-relaxed text-lg">{challenge.objectives}</p>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold">Instructions</h2>
            </div>
            <div className="bg-purple-900/50 p-6 rounded-2xl border border-purple-500/30">
              <p className="text-purple-100 whitespace-pre-line leading-relaxed text-lg">{challenge.instructions}</p>
            </div>
          </div>
        </div>
      </div>



      {/* Challenge Info Cards */}
      <div className="relative max-w-4xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 text-center">
            <div className="text-3xl mb-3">📚</div>
            <div className="text-lg font-semibold text-blue-300">{challenge.topic}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 text-center">
            <div className="text-3xl mb-3">⏱</div>
            <div className="text-lg font-semibold text-green-300">{challenge.estimatedTime}</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 text-center">
            <div className="text-3xl mb-3">⭐</div>
            <div className="text-lg font-semibold text-yellow-300">{challenge.difficulty}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <div className="text-lg font-semibold text-purple-300">30 pts</div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="relative max-w-4xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-br from-purple-800/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <h2 className="text-2xl font-bold">Community Discussion</h2>
          </div>

          {/* Comment Input */}
          <div className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts, ask questions, or help others..."
              className="w-full h-20 px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-2xl text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-purple-400/50"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={!newComment.trim() || !user}
              className="mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Post Comment
            </button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">💭</div>
                <p className="text-purple-300">No comments yet. Start the conversation!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800/50 rounded-2xl p-4 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={comment.photoURL}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border-2 border-purple-500/50"
                    />
                    <div>
                      <p className="font-semibold text-white">{comment.userName}</p>
                      <p className="text-xs text-purple-400">
                        {comment.timestamp?.toDate ? comment.timestamp.toDate().toLocaleString() : 'Recent'}
                      </p>
                    </div>
                  </div>
                  <p className="text-purple-100">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PythonChallengeDetailsPage;