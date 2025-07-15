// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserProfilePage = () => {
  const { id } = useParams(); // If this exists, we're viewing someone else's profile
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);

      if (!user && !id) {
        setLoading(false);
        return;
      }

      const userIdToFetch = id || user?.uid;

      try {
        const userRef = doc(db, "users", userIdToFetch);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setLoggingOut(false);
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  if (!authUser && !id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Please sign in to continue
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (!userData) {
    return <div className="p-6 text-center">User not found.</div>;
  }

  return (
    <section className=" bg-blueGray-50  flex flex-col justify-center">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="bg-primary shadow-xl rounded-lg mt-16 p-6">
          <div className="text-center">
            <img
              alt="Profile"
              src={userData.photoURL}
              className="shadow-xl rounded-full mx-auto mb-4 w-32"
            />
            <h3 className="text-3xl text-light font-black font-body">{userData.name}</h3>
            <p className="text-sm text-white/80">{userData.email}</p>
            <div className="mt-3">
              <p className="text-lg font-bold">🔥 Score: {userData.score ?? 0} pts</p>
              <p className="text-sm text-white/70 capitalize">
                Role: {userData.role || "member"}
              </p>
              {!id && (
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="text-sm font-medium text-white mt-10 hover:font-bold bg-black hover:bg-red-600 px-20 py-3 rounded-xl transition duration-200"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {userData.completedProblems && userData.completedProblems.length > 0 && (
        <div className="w-full lg:w-8/12 px-4 mt-10 mx-auto">
          <h4 className="text-xl font-semibold mb-4 text-center text-light">
            ✅ Completed Challenges
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-20 md:px-0">
            {userData.completedProblems.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-md border border-gray-300 bg-gray-100 dark:bg-gray-900 dark:border-gray-700 shadow-sm"
              >
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="form-checkbox text-green-500 accent-green-500 w-5 h-5 cursor-default"
                />
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-through text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition duration-150"
                >
                  {task.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfilePage;
