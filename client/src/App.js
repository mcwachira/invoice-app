import React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import { customTheme } from "./customTheme";
import useTitle from "./hooks/useTitle";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage";
import VerifiedPage from "./features/auth/pages/VerifiedPage";
import LoginPage from "./features/auth/pages/LoginPage";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import ResendEmailTokenPage from "./features/auth/pages/ResendEmailTokenPage";
import PasswordResetRequestPage from "./features/auth/pages/PasswordResetRequest";
import PasswordResetPage from "./features/auth/pages/PasswordResetPage";
import AuthRequired from "./components/AuthRequired";
import { ROLES } from "./config/roles";
import DashBoardPage from "./pages/DashBoardPage";
import UsersListPage from "./features/users/pages/UsersListPage";

const App = () => {
  useTitle("Invoice app -Home");

  const { user } = useSelector((state) => state.auth);
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="auth/verify" element={<VerifiedPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="resend" element={<ResendEmailTokenPage />} />
          UsersList
          <Route
            path="reset_password_request"
            element={<PasswordResetRequestPage />}
          />
          <Route path="auth/reset_password" element={<PasswordResetPage />} />
          {/* private routes - User */}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
            <Route path="dashboard" element={<DashBoardPage />} />
          </Route>
          {/* private routes - Admin */}
          <Route element={<AuthRequired allowedRoles={[ROLES.Adnim]} />}>
            <Route path="dashboard" element={<UsersListPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};

export default App;
