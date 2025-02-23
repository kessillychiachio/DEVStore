import styled from "styled-components";

const ToggleButton = styled.button`
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 5px;
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;

  &:hover {
    background: ${(props) => props.theme.secondary};
  }
`;

function ThemeToggle({ toggleTheme, isDarkMode }) {
  return (
    <ToggleButton onClick={toggleTheme} title="Alternar Tema">
      {isDarkMode ? "🌞" : "🌙"}
    </ToggleButton>
  );
}

export default ThemeToggle;