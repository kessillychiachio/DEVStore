import styled from "styled-components";

const SvgStyled = styled.svg`
  width: 25px;
  height: auto;
  cursor: pointer;
  fill: ${(props) => (props.ativo ? "gold" : "white")};
  transition: fill 0.3s ease-in-out;
`;

function FavoritoSVG({ ativo }) {
  return (
    <SvgStyled viewBox="0 0 24 24">
      <path d="M12 17.75l-6.16 3.59 1.18-7.1-5.17-4.85 7.15-1.03L12 2l3.2 6.46 7.15 1.03-5.17 4.85 1.18 7.1z" />
    </SvgStyled>
  );
}

export default FavoritoSVG;
