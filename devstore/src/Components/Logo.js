import styled from "styled-components";
import LogoImg from "../Assets/logo.svg";
import { Link } from "react-router-dom";

const LogoContainer = styled(Link)`  
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  img {
    width: 40px;
  }
`;

const LogoText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

const DevText = styled.span`
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 24px;
  font-weight: bold;
  color: black; 
`;

const StoreText = styled.span`
  font-size: 18px; 
  font-weight: normal;
`;

function Logo() {
  return (
    <LogoContainer to="/">
      <img src={LogoImg} alt="Logo da DEV Store" />
      <LogoText>
        <DevText>DEV</DevText><StoreText>store</StoreText>
      </LogoText>
    </LogoContainer>
  );
}

export default Logo;