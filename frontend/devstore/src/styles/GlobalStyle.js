import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
}

a {
  color: ${(props) => props.theme.primary};
  text-decoration: none;
}

a:hover {
  color: ${(props) => props.theme.secondary};
}
`;

export default GlobalStyle;