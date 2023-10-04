import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileData from "./UserProfile/ProfileData";
import HomePage from "./Home/HomePage";
import LoginPage from "./Login.js/LoginPage";
import PrivateRoutes from "./utils/PrivateRoute";
import { AuthProvider } from "./Context/AuthContext";
import RegistrationForm from "./register/Register";
import Upload from "./Upload/Upload";
import { useEffect } from "react";
import Rightside from "./ImageFeed/Rightside";
import { ProfileProvider } from "./Home/ProfileContext";
import Searchpage from "./Search/SearchPage"; 
import CardWithList from "./Follow&Unfollow/FollowersData";
import Notifications from "./Notifications/Notify/Notifications";
import Followlist from "./SuggestionBox/Followlist";

function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ProfileProvider>
          <div className="App">
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route element={<HomePage />} path="/" exact>
                  <Route index element={<Rightside />} />
                  <Route element={<Searchpage />} path="search" />
                  <Route element={<Upload />} path="create" />
                  <Route element={<Notifications />} path="notification" />
                  <Route element={<Followlist />} path="suggestion" />
                  <Route element={<ProfileData />} path="/profile/:id" />
                  <Route element={<CardWithList />} path="Followers/:flr_data" />
                  <Route element={<CardWithList />} path="Following/:flg_data" />
                </Route>
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
          </div>
        </ProfileProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
