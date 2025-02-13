import styled from "styled-components";
import LogoImg from "../Assets/logo.svg";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 50px;
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: black;
    text-decoration: none;
  }
`;

function Logo() {
  return (
    <LogoContainer>
      <img src={LogoImg} alt="logo" />
      <p><strong>DEV</strong>Store</p>
    </LogoContainer>
  );
}

export default Logo;