import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import CandLayout from "./Layout/CandidatesLayout";
import SignupLayout from "./Layout/Auth/SignupLayout";
import LoginLayout from "./Layout/Auth/LoginLayout";
import ProfileLayout from "./Layout/ProfileLayout";
import VoteNowLayout from "./Layout/user/VoteNowLayout";
import ElectionLayout from "./Layout/ElectionLayout";
import AdminLayout from "./Layout/AdminLayout";
import ConstituencyLayout from "./Layout/ConstituencyLayout";
import PrivateRoute from "./Components/PrivateRoute";
import ConstPreview from "./Pages/Constituency/ConstPreview";
import ConstUpdate from "./Pages/Constituency/ConstUpdate";
import VoteHome from "./Pages/VoteNow/VoteHome";
import VoteScreen from "./Pages/VoteNow/VoteScreen";
import ProfilePage from "./Pages/Profile/ProfilePage";
import ProfileUpdate from "./Pages/Profile/ProfileUpdate";
import ElectionHome from "./Pages/Elections/ElectionHome";
import ElectionPreview from "./Pages/Elections/ElectionPreview";
import CreateElection from "./Pages/Elections/CreateElection";
import ConstHome from "./Pages/Constituency/ConstHome";
import ConstCreate from "./Pages/Constituency/ConstCreate";
import PartyHome from "./Pages/Parties/PartyHome";
import PartyCreate from "./Pages/Parties/PartyCreate";
import PartyView from "./Pages/Parties/PartyView";
import PartyUpdate from "./Pages/Parties/PartyUpdate";
import PartyLayout from "./Layout/PartyLayout";
import CandHome from "./Pages/Candidate/CandHome";
import CandCreate from "./Pages/Candidate/CandCreate";
import CandPreview from "./Pages/Candidate/CandPreview";
import CandUpdate from "./Pages/Candidate/CandUpdate";
import VoterLayout from "./Layout/VoterLayout";
import ComplaintAdminHome from "./Pages/Complaints/Admin/ComplaintAdminHome";
import ComplaintLayout from "./Layout/ComplaintLayout";
import ComplaintUserHome from "./Pages/Complaints/User/ComplaintUserHome";
import SiteHome from "./Pages/SiteHome";
import SettingsLayout from "./Layout/SettingsLayout";
import AdminSettings from "./Pages/AdminSettings";
import SeedData from "./Pages/SeedData";
import Results from "./Pages/Results";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="" element={<RootLayout />}>
            <Route index element={<SiteHome />} />
            <Route path="signup" element={<SignupLayout />} />
            <Route path="signin" element={<LoginLayout />} />
            <Route path="results" element={<Results />} />
            <Route
              path="voter"
              element={
                <PrivateRoute allowedRoles={["voter"]} redirectTo="/signin" />
              }
            >
              <Route index element={<VoterLayout />} />
              <Route path="results" element={<Results />} />
              <Route path="vote" element={<VoteNowLayout />}>
                <Route index element={<VoteHome />} />
                <Route path=":id" element={<VoteScreen />} />
              </Route>
              <Route path="profile" element={<ProfileLayout />}>
                <Route index element={<ProfilePage />} />
                <Route path="update" element={<ProfileUpdate />} />
              </Route>
              <Route path="complaint" element={<ComplaintLayout />}>
                <Route index element={<ComplaintUserHome />} />
              </Route>
            </Route>
            <Route
              path="admin"
              element={
                <PrivateRoute allowedRoles={["admin"]} redirectTo="/signin" />
              }
            >
              <Route index element={<AdminLayout />} />
              <Route path="results" element={<Results />} />
              <Route path="elections" element={<ElectionLayout />}>
                <Route index element={<ElectionHome />} />
                <Route path="create" element={<CreateElection />} />
                <Route path=":id" element={<ElectionPreview />} />
              </Route>
              <Route path="constituency" element={<ConstituencyLayout />}>
                <Route index element={<ConstHome />} />
                <Route path="create" element={<ConstCreate />} />
                <Route path=":id" element={<ConstPreview />} />
                <Route path="update/:id" element={<ConstUpdate />} />
              </Route>
              <Route path="party" element={<PartyLayout />}>
                <Route index element={<PartyHome />} />
                <Route path="create" element={<PartyCreate />} />
                <Route path=":id" element={<PartyView />} />
                <Route path="update/:id" element={<PartyUpdate />} />
              </Route>
              <Route path="candidate" element={<CandLayout />}>
                <Route index element={<CandHome />} />
                <Route path="create" element={<CandCreate />} />
                <Route path=":id" element={<CandPreview />} />
                <Route path="update/:id" element={<CandUpdate />} />
              </Route>
              <Route path="complaints" element={<ComplaintLayout />}>
                <Route index element={<ComplaintAdminHome />} />
              </Route>
              <Route path="settings" element={<SettingsLayout />}>
                <Route index element={<AdminSettings />} />
                <Route path="seed-data" element={<SeedData />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
