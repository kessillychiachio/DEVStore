import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import Icon from "../Assets/Icons";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: ${(props) => props.theme.navBackground};
  transition: background 0.3s ease-in-out; 
`;

const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;

  a {
    color: ${(props) => props.theme.text};
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    background: transparent;
    border: 0.5px solid transparent;

    &:hover {
      text-decoration: underline orange;
      transform: scale(0.9);
    }
  }
`;

const IconWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
`;

function Navbar({ toggleTheme, isDarkMode }) {
  return (
    <Nav>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <NavLinks>
        <Link to="/Categorias">CATEGORIAS</Link>
        <Link to="/MinhaEstante">MINHA ESTANTE</Link>
        <Link to="/Favoritos">FAVORITOS</Link>
      </NavLinks>

      <IconWrapper>
        
      <Link to="/Sacola">
        <img src={Icon.sacola} alt="Ícone de sacola" width="22px" />
      </Link>
      <Link to="/Login">
        <img src={Icon.perfil} alt="Ícone de perfil" width="24px" />
      </Link>

        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </IconWrapper>
    </Nav>
  );
}

export default Navbar;