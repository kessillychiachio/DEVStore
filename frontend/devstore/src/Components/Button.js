import styled from "styled-components";

const Button = styled.button`
  justify-content: center;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.08);
    background: ${(props) => props.theme.secondary};
  }
`;

export default Button;