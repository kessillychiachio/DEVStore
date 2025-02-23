import styled from "styled-components";
import Button from "./Button";
import FavoritoSVG from "./FavoritoSVG";
import { useState, useEffect } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.primary};
  padding: 15px;
  text-align: center;
  width: 220px;
  height: 460px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(12px);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.secondary};
  }
`;

const BookImage = styled.img`
  width: 100%;
`;

const BookInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BookTitle = styled.h3`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

const BookDescription = styled.p`
  color: black;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
`;

const FavWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

function BookCard({ livro, onRemoveFavorite }) {
  const [shelfBooks, setShelfBooks] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("minhaEstante")) || [];
    }
    return [];
  });

  const [favoritado, setFavoritado] = useState(false);

  useEffect(() => {
    async function checkIfFavorito() {
      try {
        const favoritos = await getFavoritos();
        setFavoritado(favoritos.some((b) => b.id === livro.id));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    }

    if (livro) {
      checkIfFavorito();
    }
  }, [livro]);

  const handleFavoriteToggle = async () => {
    if (!livro || !livro.id) return;

    try {
      if (favoritado) {
        await removeFavorito(livro.id);
        if (onRemoveFavorite) onRemoveFavorite(livro.id);
      } else {
        await addFavorito(livro.id);
      }
      setFavoritado(!favoritado);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const handleAddToShelf = () => {
    if (!livro || !livro.nome || shelfBooks.some((b) => b.nome === livro.nome)) return;

    const updatedBooks = [...shelfBooks, livro];
    setShelfBooks(updatedBooks);
    localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
    alert("Livro adicionado à estante!");
  };

  return (
    <Card>
      <FavWrapper onClick={handleFavoriteToggle}>
        <FavoritoSVG ativo={favoritado} />
      </FavWrapper>
      <BookImage src={livro?.imagem} alt={livro?.nome || "Livro"} />
      <BookInfo>
        <BookTitle>{livro?.nome || "Título Indisponível"}</BookTitle>
        <BookDescription>{livro?.descricao || "Descrição não disponível"}</BookDescription>
      </BookInfo>
      <ButtonWrapper>
        <Button onClick={handleAddToShelf} disabled={shelfBooks.some((b) => b.nome === livro?.nome)}>
          {shelfBooks.some((b) => b.nome === livro?.nome) ? "Já na Estante" : "Adicionar à Estante"}
        </Button>
      </ButtonWrapper>
    </Card>
  );
}

export default BookCard;
