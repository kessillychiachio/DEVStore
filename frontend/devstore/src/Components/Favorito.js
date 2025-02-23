import { useState, useEffect } from "react";
import FavoritoSVG from "./FavoritoSVG";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos";
import styled from "styled-components";

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

function Favoritar({ livro }) {
  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    if (!livro) return;

    async function checkIfFavorito() {
      try {
        const favoritos = await getFavoritos();
        setFavoritado(favoritos.some((b) => b.id === livro.id));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    }

    checkIfFavorito();
  }, [livro]);

  const handleFavoriteToggle = async () => {
    if (!livro || !livro.id) return;

    try {
      if (favoritado) {
        await removeFavorito(livro.id);
      } else {
        await addFavorito(livro);
      }

      setFavoritado(!favoritado);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  return (
    <FavWrapper onClick={handleFavoriteToggle}>
      <FavoritoSVG ativo={favoritado ? "true" : "false"} />
    </FavWrapper>
  );
}

export default Favoritar;
