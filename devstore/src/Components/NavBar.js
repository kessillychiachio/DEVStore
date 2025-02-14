import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import Icon from "./Icon";
import ThemeToggle from "./ThemeToggle";
import { sacola, perfil } from "../assets/Icons";

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
      border-color: ${(props) => props.theme.primary};
      box-shadow: 0px 0px 10px ${(props) => props.theme.primary};
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
        <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Link to="/Sacola">
          <Icon src={sacola} alt="Ícone de sacola" size="22px" clickable />
        </Link>
        <Link to="/Login">
          <Icon src={perfil} alt="Ícone de perfil" size="24px" clickable />
        </Link>
      </IconWrapper>
    </Nav>
  );
}

export default Navbar;