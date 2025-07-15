// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

const UserProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userRef = doc(db, "users", id);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData(null);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setUserData(null);
      }
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading user profile...</div>;
  if (!userData) return <div className="p-6 text-center">User not found.</div>;

  return (
    <section className="pt-16 bg-blueGray-50 min-h-screen flex flex-col justify-center">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="bg-white shadow-xl rounded-lg mt-16 p-6">
          <div className="text-center">
            <img
              alt="Profile"
              src={userData.photoURL}
              className="shadow-xl rounded-full mx-auto mb-4 w-32"
            />
            <h3 className="text-xl font-semibold">{userData.name}</h3>
            <p className="text-sm text-gray-600">{userData.email}</p>
            <div className="mt-6">
              <p className="text-lg">🔥 Score: {userData.score ?? 0} pts</p>
              <p className="text-sm text-gray-500 capitalize">
                Role: {userData.role || "member"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {userData.completedProblems && userData.completedProblems.length > 0 && (
  <div className="w-full lg:w-8/12 px-4 mt-10 mx-auto">
    <h4 className="text-xl font-semibold mb-4 text-center text-gray-800">✅ Completed Challenges</h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
