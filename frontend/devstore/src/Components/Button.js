import styled from "styled-components";

const Button = styled.button`
  position: relative;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 5px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  transition: 0.4s;
  text-transform: uppercase;
  border: none;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: scale(1.08);
    background: ${(props) => props.theme.secondary};
  }

  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: linear-gradient(45deg, gray, white);
    border-radius: 10px;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0.5px;
    background: ${(props) => props.theme.background};
    border-radius: 6px;
    z-index: -1;
  }
`;

export default Button;
