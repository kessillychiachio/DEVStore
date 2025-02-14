import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./assets/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Categorias from "./Pages/Categorias";
import MinhaEstante from "./Pages/MinhaEstante";
import Favoritos from "./Pages/Favoritos";
import Sacola from "./Pages/Sacola";
import Login from "./Pages/Login";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/MinhaEstante" element={<MinhaEstante />} />
          <Route path="/Favoritos" element={<Favoritos />} />
          <Route path="/Sacola" element={<Sacola />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;