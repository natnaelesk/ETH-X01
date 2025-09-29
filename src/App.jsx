import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ChallengePage from "./pages/ChallengePage";
import AdminPage from "./pages/AdminPage";
import { db } from "./Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import DiscussionPanel from "./pages/DiscussionPage";
import UnderConstruction from "./pages/UnderConstruction ";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HeroSection from "./Components/HeroSection";
import BulkUploader from "./Components/BulkUploader";
import PythonChallengePage from './Components/PythonChallengePage';
import PythonChallengeDetailsPage from './Components/PythonChallengeDetailsPage';
import PythonAdminPanel from "./Components/PythonAdminPanel";
import PythonBulkUploader from "./Components/PythonBulkUploader";

const App = () => {
  const [pythonChallenges, setPythonChallenges] = useState([]);
  const [pythonChallengesLoading, setPythonChallengesLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "challenges"));
        const fetchedChallenges = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChallenges(fetchedChallenges);
      } catch (err) {
        console.error("Error loading challenges:", err);
      }
    };

    const fetchLeaderboard = async () => {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "users"), orderBy("score", "desc"))
        );

        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          avatar: doc.data().photoURL,
          score: doc.data().score,
        }));

        setLeaderboard(users);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLeaderboardLoading(false);
      }
    };

    fetchChallenges();
    fetchLeaderboard();
  }, []);

  const navigationItems = ["Home","Discover","Discussion","Profile","Challenges"];
  // Add this useEffect to fetch Python challenges
// In App.js, make sure you're fetching from the right collection
useEffect(() => {
  const fetchPythonChallenges = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pythonChallenges"));
      const fetchedChallenges = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("✅ Fetched Python challenges:", fetchedChallenges); // Debug log
      setPythonChallenges(fetchedChallenges);
    } catch (err) {
      console.error("❌ Error loading Python challenges:", err);
    } finally {
      setPythonChallengesLoading(false);
    }
  };

  fetchPythonChallenges();
}, []);

  return (
    <Router>
      <div className="bg-surface min-h-screen flex flex-col">
        <Navbar navigationData={navigationItems} className="relative z-50" />
        <main className="flex-grow relative z-10 ">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HeroSection />} />
            <Route path="/discover" element={<UnderConstruction />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/discussion" element={<DiscussionPanel />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/bulk-upload" element={<BulkUploader />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
             {/* LeetCode challenges */}
            <Route
              path="/challenges/leetcode"
              element={
                <ChallengePage
                  challenges={challenges}
                  leaderboard={leaderboardLoading ? null : leaderboard}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route path="/challenges/leetcode/:id" element={<ChallengeDetailPage />} />

            {/* Python challenges */}
            <Route
              path="/challenges/python-crash-course"
              element={
                <PythonChallengePage
                  isLoggedIn={isLoggedIn}
                  challenges={pythonChallenges}
                  leaderboard={leaderboardLoading ? null : leaderboard}
                  loading={pythonChallengesLoading}
                />
              }
            />
            <Route
              path="/challenges/python-crash-course/:id"
              element={<PythonChallengeDetailsPage isLoggedIn={isLoggedIn} />}
            />
            <Route path="/admin/python-challenges" element={<PythonAdminPanel />} />
            <Route path="/bulk-upload-python" element={<PythonBulkUploader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;