import styled from "styled-components";

const TitleStyled = styled.h1`
  font-size: ${(props) => props.size || "28px"};
  color: ${(props) => props.color || "#fff"};
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  font-weight: bold;
  letter-spacing: 1px;
  text-align: ${(props) => props.align || "center"};
`;

const SubtitleStyled = styled.h2`
  font-size: ${(props) => props.size || "20px"};
  color: ${(props) => props.color || "#ccc"};
  text-transform: ${(props) => (props.uppercase ? "uppercase" : "none")};
  font-weight: normal;
  text-align: ${(props) => props.align || "center"};
`;

function Title({ text, size, color, uppercase, align }) {
  return <TitleStyled size={size} color={color} uppercase={uppercase} align={align}>{text}</TitleStyled>;
}

function Subtitle({ text, size, color, uppercase, align }) {
  return <SubtitleStyled size={size} color={color} uppercase={uppercase} align={align}>{text}</SubtitleStyled>;
}

export { Title, Subtitle };