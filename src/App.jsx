import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/ChallengePage";
import AdminPage from "./pages/AdminPage";
import { db } from "./Firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ChallengeDetailPage from "./pages/ChallengeDetailPage";
import DiscussionPanel from "./pages/DiscussionPage";
import UnderConstruction from "./pages/UnderConstruction ";
import BulkUploader from "./Components/BulkUploader";
import PythonAdminPanel from "./Components/PythonAdminPanel";
import PythonBulkUploader from "./Components/PythonBulkUploader";
import { PublicLayout } from "./components/layout/PublicLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { SignupPage } from "./features/auth/pages/SignupPage";
import { ProfilePage as AppProfilePage } from "./features/profile/pages/ProfilePage";
import { PythonTrackPage } from "./features/pythonTrack/pages/PythonTrackPage";
import { LandingPage } from "./features/marketing/page/LandingPage";
import { useAuth } from "./app/useAuth";

const App = () => {
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const { user } = useAuth();

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

  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout user={user} />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/discover" element={<UnderConstruction />} />
          <Route path="/profile" element={<AppProfilePage />} />
          <Route path="/discussion" element={<DiscussionPanel />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/bulk-upload" element={<BulkUploader />} />
          <Route path="/profile/:id" element={<AppProfilePage />} />
          <Route
            path="/leetcode"
            element={
              <ChallengePage
                challenges={challenges}
                leaderboard={leaderboardLoading ? null : leaderboard}
              />
            }
          />
          <Route path="/leetcode/:id" element={<ChallengeDetailPage />} />
          <Route path="/python-crash-course" element={<PythonTrackPage />} />
          <Route path="/admin/python-challenges" element={<PythonAdminPanel />} />
          <Route path="/bulk-upload-python" element={<PythonBulkUploader />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
