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
import { collection, getDocs, query, orderBy } from "firebase/firestore"; // <- FIXED: added query, orderBy
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import DiscussionPanel from "./pages/DiscussionPage";
import UnderConstruction from "./pages/UnderConstruction ";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HeroSection from "./Components/HeroSection";

const App = () => {
  const [user, setUser] = useState(null);

useEffect(() => {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    setUser(firebaseUser);
  });

  return () => unsubscribe(); // cleanup listener
}, []);
  const isLoggedIn = !!user;
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true); // <- new

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
        setLeaderboardLoading(false); // <- finish loading
      }
    };

    fetchChallenges();
    fetchLeaderboard();
  }, []);

  const navigationItems = ["Home","Discover","Discussion","Profile","Challenges"];

  return (
    <Router>
      <div className="bg-surface min-h-screen flex flex-col">
        <Navbar navigationData={navigationItems} className="relative z-50" />
        <main className=" flex-grow  relative z-10 pb-24">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HeroSection />} />
            <Route path="/discover" element={<UnderConstruction />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/discussion" element={<DiscussionPanel />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route
              path="/challenges"
              element={
                <ChallengePage
                  challenges={challenges}
                  leaderboard={leaderboardLoading ? null : leaderboard} // <- pass null until loaded
                  isLoggedIn={isLoggedIn} 
                  
                />
              }
            />
            <Route path="/profile/:id" element={<ProfilePage  />} />
            <Route path="/challenge/:id" element={<ChallengeDetailPage />} />
            </Routes>
        </main>
        
      </div>
    </Router>
  );
};

export default App;
