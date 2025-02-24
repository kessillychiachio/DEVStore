import styled from "styled-components";

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 12px 18px;
  cursor: pointer;
  font-size: 11px;
  font-weight: bold;
  transition: 0.3s;
  text-transform: uppercase;
  border: none;
  overflow: hidden;
  z-index: 1;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.secondary};
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff416c, #1e90ff);
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: ${(props) => props.theme.background};
    z-index: -1;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export default Button;
