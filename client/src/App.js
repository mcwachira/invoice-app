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
          <Route path="auth/verified" element={<VerifiedPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};

export default App;
