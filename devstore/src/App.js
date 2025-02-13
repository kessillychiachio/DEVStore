import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Categorias from "./Pages/Categorias";
import MinhaEstante from "./Pages/MinhaEstante";
import Favoritos from "./Pages/Favoritos";
import Sacola from "./Pages/Sacola";
import Login from "./Pages/Login";


function App() {
  return (
    <Router>
      <GlobalStyle/>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/MinhaEstante" element={<MinhaEstante />} />
        <Route path="/Favoritos" element={<Favoritos />} />
        <Route path="/Sacola" element={<Sacola />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}
    

export default App;
