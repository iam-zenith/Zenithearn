import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import NotificationDisplay from "./layout/NotificationDisplay";
import Home from "./app/Home";
import Terms from "./app/Terms";
import Dashboard from "./app/Dashboard";
import Profile from "./app/Profile";
import Sidebar from "./layout/Sidebar";
import FooterAuth from "./layout/FooterAuth";
import Register from "./auth/Register";
import Login from "./auth/login";
import ForgotPassword from "./auth/ForgotPassword";
import NotFound from "./auth/NotFound";
import ProtectedRoute from "./auth/ProtectedRoutes";
import CheckAuth from "./auth/checkAuth";
import Verify from "./auth/Verify";
import Deposit from "./app/Deposit";
import Withdrawal from "./app/Withdrawal";
import ResetPassword from "./app/ResetPassword";
import Plans from "./app/Plans";
import LiveTrade from "./app/LiveTrade";
import Kyc from "./app/KYC";
import TransactionHistory from "./app/TransactionHistory";
import GoogleTranslate from "./app/subComponents/GoogletTranslate";
import FooterLanding from "./layout/FooterLanding";
import Navbar from "./layout/Navbar";
import Contact from "./app/Contact";
import About from "./app/About";
// import Chatbot from "./layout/Chatbot";
import Smartsupp from "./layout/Smartsupp";
import CopyTrade from "./app/CopyTrade";
import VisualLiveTrade from "./app/VisualLiveTrade";
export default function Router() {
  const LandingLayout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <NotificationDisplay />
        <FooterLanding />
        {/* <Chatbot /> */}
        <Smartsupp />
      </>
    );
  };
  const Layout = () => {
    return (
      <div className='h-screen flex'>
        {/* Sidebar */}
        <div className='sidebar'>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className='main'>
          <GoogleTranslate />
          <Outlet />
        </div>

        {/* Notifications */}
        <NotificationDisplay />
        {/* <Chatbot /> */}
        <Smartsupp />
      </div>
    );
  };

  const Auth = () => {
    return (
      <>
        <Outlet />
        <NotificationDisplay />
        <FooterAuth />
        <Smartsupp />
        {/* <Chatbot /> */}
      </>
    );
  };
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "terms", element: <Terms /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <Profile /> },
        { path: "deposit", element: <Deposit /> },
        { path: "withdrawal", element: <Withdrawal /> },
        { path: "security", element: <ResetPassword /> },
        { path: "plans", element: <Plans /> },
        { path: "trade", element: <VisualLiveTrade /> },
        { path: "live-trade", element: <LiveTrade /> },
        { path: "copy-trading", element: <CopyTrade /> },
        { path: "kyc", element: <Kyc /> },
        { path: "transaction", element: <TransactionHistory /> },
      ],
    },
    {
      path: "/auth",
      element: (
        <CheckAuth>
          <Auth />
        </CheckAuth>
      ),
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify", element: <Verify /> },
        { path: "forgot-password", element: <ForgotPassword /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={BrowserRouter} />;
}
