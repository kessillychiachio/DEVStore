import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.4s;
  text-transform: uppercase;
  box-shadow: 0px 4px 12px ${(props) => props.theme.secondary};

  &:hover {
    transform: scale(1.08);
    background: ${(props) => props.theme.secondary};
    box-shadow: 0px 0px 20px ${(props) => props.theme.primary};
  }
`;

export default Button;