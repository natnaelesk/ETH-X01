import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ChallengePage from "./pages/ChallengePage";
import AdminPage from "./pages/AdminPage";
import { db } from "./Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import DiscussionPanel from "./pages/DiscussionPage";
import UnderConstruction from "./pages/UnderConstruction ";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import BulkUploader from "./Components/BulkUploader";
import PythonChallengePage from './Components/PythonChallengePage';
import PythonChallengeDetailsPage from './Components/PythonChallengeDetailsPage';
import PythonAdminPanel from "./Components/PythonAdminPanel";
import PythonBulkUploader from "./Components/PythonBulkUploader";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { ChallengesPage } from "./features/challenges/pages/ChallengesPage";
import { DashboardPage } from "./features/dashboard/pages/DashboardPage";
import { DashboardWorkspacePage } from "./features/dashboard/pages/DashboardWorkspacePage";
import { DsaTopicsPage } from "./features/dsa/pages/DsaTopicsPage";
import { LeaderboardPage } from "./features/Leaderboard/pages/LeaderboardPage";
import { PythonTrackPage } from "./features/pythonTrack/pages/PythonTrackPage";
import { LandingPage } from "./features/marketing/page/LandingPage";

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

  useEffect(() => {
    const fetchPythonChallenges = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pythonChallenges"));
        const fetchedChallenges = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("✅ Fetched Python challenges:", fetchedChallenges);
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
      <Routes>
        <Route element={<PublicLayout user={user} />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/discover" element={<UnderConstruction />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/discussion" element={<DiscussionPanel />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bulk-upload" element={<BulkUploader />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route
            path="/leetcode"
            element={
              <ChallengePage
                challenges={challenges}
                leaderboard={leaderboardLoading ? null : leaderboard}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/leetcode/:id" element={<ChallengeDetailPage />} />
          <Route
            path="/python-crash-course"
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
            path="/python-crash-course/:id"
            element={<PythonChallengeDetailsPage isLoggedIn={isLoggedIn} />}
          />
          <Route path="/admin/python-challenges" element={<PythonAdminPanel />} />
          <Route path="/bulk-upload-python" element={<PythonBulkUploader />} />
        </Route>

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dsa" element={<DsaTopicsPage />} />
          <Route path="python" element={<PythonTrackPage />} />
          <Route path="challenges" element={<ChallengesPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="profile" element={<DashboardWorkspacePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
