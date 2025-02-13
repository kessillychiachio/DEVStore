import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Components/Logo";
import Icon from "../Components/Icon";
import { sacola, perfil } from "../Assets/Icons";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  backdrop-filter: blur(15px);
  margin: 10px auto;
  width: 100%;
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
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    background: transparent;
    border: 0.5px solid transparent;

    &:hover {
      border-color: #FD8224;
      box-shadow: 0px 0px 10px #FD8224;
      transform: scale(0.9);
    }
  }
`;

const IconWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
`;

function Navbar() {
  return (
    <Nav>
      <LogoWrapper>
        <Logo/>
      </LogoWrapper>

      <NavLinks>
        <Link to="/Categorias">CATEGORIAS</Link>
        <Link to="/MinhaEstante">MINHA ESTANTE</Link>
        <Link to="/Favoritos">FAVORITOS</Link>
      </NavLinks>

      <IconWrapper>
        <Link to="/Sacola">
          <Icon src={sacola} alt="Ícone de sacola" size="25px" clickable />
        </Link>
        <Link to="/Login">
          <Icon src={perfil} alt="Ícone de perfil" size="29px" clickable />
        </Link>
      </IconWrapper>
    </Nav>
  );
}

export default Navbar;