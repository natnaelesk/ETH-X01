import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { LoginPage } from "./features/auth/pages/LoginPage";
import { SignupPage } from "./features/auth/pages/SignupPage";
import { DiscussionPage } from "./features/discussion/pages/DiscussionPage";
import { ChallengeDetailPage } from "./features/leetcode/pages/ChallengeDetailPage";
import { LeetcodePage } from "./features/leetcode/pages/LeetcodePage";
import { LandingPage } from "./features/marketing/page/LandingPage";
import { PythonLessonDetailPage } from "./features/python/pages/PythonLessonDetailPage";
import { PythonTrackPage } from "./features/python/pages/PythonTrackPage";
import { ProfilePage as AppProfilePage } from "./features/profile/pages/ProfilePage";
import UnderConstruction from "./pages/UnderConstruction ";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/discover" element={<UnderConstruction />} />
          <Route path="/profile" element={<AppProfilePage />} />
          <Route path="/discussion" element={<DiscussionPage />} />

          <Route path="/challenges" element={<LeetcodePage />} />
          <Route path="/challenges/:id" element={<ChallengeDetailPage />} />
          <Route path="/python" element={<PythonTrackPage />} />
          <Route path="/python/:id" element={<PythonLessonDetailPage />} />

          <Route path="/leetcode" element={<Navigate to="/challenges" replace />} />
          <Route
            path="/leetcode/:id"
            element={<LegacyChallengeRedirect />}
          />
          <Route
            path="/python-crash-course"
            element={<Navigate to="/python" replace />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

function LegacyChallengeRedirect() {
  const { id } = useParams();
  return <Navigate to={`/challenges/${id}`} replace />;
}

export default App;
