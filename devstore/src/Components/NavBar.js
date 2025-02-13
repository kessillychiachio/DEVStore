import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Components/Logo";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
`;



const NavLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

function Navbar() {
  return (
    <Nav>
      <Link to="/">
      <Logo/>
      </Link>
      <NavLinks>
        <Link to="/Categorias">Categorias</Link>
        <Link to="/MinhaEstante">Minha Estante</Link>
        <Link to="/Favoritos">Favoritos</Link>
        <Link to="/Sacola">Sacola</Link>
        <Link to="/Login">Login</Link>
      </NavLinks>
    </Nav>
  );
}

export default Navbar;