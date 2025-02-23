import styled from "styled-components";

const IconWrapper = styled.img`
  width: ${(props) => props.size || "40px"};
  height: auto;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
`;

function Icon({ src, alt, size = "40px", clickable = false }) {
  return <IconWrapper src={src} alt={alt} size={size} clickable={clickable.toString()} />;
}

export default Icon;