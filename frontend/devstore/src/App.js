import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import MinhaEstante from "./pages/MinhaEstante";
import Favoritos from "./pages/Favoritos";
import Sacola from "./pages/Sacola";
import Login from "./pages/Login";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark" || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    } catch (error) {
      console.warn("⚠️ Erro ao acessar localStorage:", error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <GlobalStyle />
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MinhaEstante" element={<MinhaEstante />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/sacola" element={<Sacola />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
