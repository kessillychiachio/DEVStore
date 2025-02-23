import styled from "styled-components";
import Button from "./Button";
import FavoritoSVG from "./FavoritoSVG";
import { useState, useEffect, useMemo } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos";

const BookCardWrapper = styled.div`
  width: 160px;
  height: 240px;
  background: ${(props) => props.theme.primary};
  border-radius: 5px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BookCover = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  color: white;
  padding: 10px;
  z-index: 1;

  ${BookCardWrapper}:hover & {
    opacity: 1;
  }
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const BookDescription = styled.p`
  font-size: 12px;
`;

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
`;

function BookCard({ livro, onRemoveBook, onAddBook }) {
  const [favoritado, setFavoritado] = useState(false);

  const naEstante = useMemo(() => {
    if (!livro) return false;
    const storedBooks = JSON.parse(localStorage.getItem("minhaEstante")) || [];
    return storedBooks.some((b) => b.id === livro.id);
  }, [livro]);

  useEffect(() => {
    if (!livro) return;

    const checkIfFavorito = async () => {
      try {
        const favoritos = await getFavoritos();
        setFavoritado(favoritos.some((b) => b.id === livro.id));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    checkIfFavorito();
  }, [livro]);

  if (!livro || !livro.id) {
    return null;
  }

  const handleFavoriteToggle = async () => {
    if (!livro || !livro.id) return;

    try {
      if (favoritado) {
        await removeFavorito(livro.id);
      } else {
        await addFavorito(livro.id);
      }

      const favoritosAtualizados = await getFavoritos();
      setFavoritado(favoritosAtualizados.some((b) => b.id === livro.id));
      localStorage.setItem("favoritos", JSON.stringify(favoritosAtualizados));
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  return (
    <BookCardWrapper>
      <BookCover style={{ backgroundImage: `url(${livro?.imagem})` }}>
        <FavWrapper onClick={handleFavoriteToggle}>
          <FavoritoSVG ativo={favoritado} />
        </FavWrapper>
        <Overlay>
          <BookTitle>{livro?.nome || "Título Indisponível"}</BookTitle>
          <BookDescription>{livro?.descricao || "Descrição não disponível"}</BookDescription>
        </Overlay>
      </BookCover>
      <ButtonWrapper>
        {naEstante ? (
          <Button onClick={() => onRemoveBook(livro.id)} color="red">
            Remover da Estante
          </Button>
        ) : (
          <Button onClick={() => onAddBook(livro)}>
            Adicionar à Estante
          </Button>
        )}
      </ButtonWrapper>
    </BookCardWrapper>
  );
}

export default BookCard;
