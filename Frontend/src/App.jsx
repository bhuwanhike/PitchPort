import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import Explore from "./Routes/Explore";
import Navbar from "./components/Navbar";
import Startup from "./Routes/Startup";
import Investor from "./Routes/Investors";
import About from "./Routes/About";
import Register from "./Routes/Register";
import Login from "./Routes/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./Routes/Settings";
import ProfileContent from "./Routes/ProfileContent";
import DashboardContent from "./Routes/DashboardContent";
import SecurityContent from "./Routes/SecurityContent";
import NotificationsContent from "./Routes/NotificationsContent";
import BillingContent from "./Routes/BillingContent";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import StartupDetailPage from "./Routes/StartupDetailPage";
import InvestorDetailPage from "./Routes/InvestorDetailPage";
import { StartupProvider } from "./contexts/StartupContext";
import { InvestorProvider } from "./contexts/InvestorContext";

function App() {
  const location = useLocation();
  const hideNavbarOnPaths = [
    "/settings",
    "/settings/profile",
    "/settings/dashboard",
    "/settings/security",
    "/settings/notifications",
    "/settings/billing",
  ];
  return (
    <StartupProvider>
      <InvestorProvider>
        <AuthProvider>
          {!hideNavbarOnPaths.includes(location.pathname) && <Navbar />}
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/startups" element={<Startup />} />
            <Route path="/investors" element={<Investor />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />}>
              <Route
                index
                element={<Navigate to="settings/profile/" replace />}
              />
              <Route path="profile/" element={<ProfileContent />} />
              <Route path="dashboard/" element={<DashboardContent />} />
              <Route path="security/" element={<SecurityContent />} />
              <Route path="notifications/" element={<NotificationsContent />} />
              <Route path="billing/" element={<BillingContent />} />
            </Route>

            <Route path="/startup/" element={<StartupDetailPage />} />

            <Route path="/investor/" element={<InvestorDetailPage />} />
            {/* Optional: A catch-all route for 404 pages */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
          <Chatbot />
          {!hideNavbarOnPaths.includes(location.pathname) && <Footer />}
        </AuthProvider>
      </InvestorProvider>
    </StartupProvider>
  );
}

export default App;
