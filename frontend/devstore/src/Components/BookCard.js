import styled from "styled-components";
import Button from "./Button";
import FavoritoSVG from "./FavoritoSVG";
import { useState, useEffect } from "react";
import { getFavoritos, addFavorito, removeFavorito } from "../services/favoritos";
import { getEstante, addLivroEstante, removeLivroEstante } from "../services/estante";

const BookCardWrapper = styled.div`
  width: 160px;
  height: 240px;
  background: ${(props) => props.theme.primary};
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
  z-index: -1;

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

function BookCard({ livro, onAddBook }) { 
  
  const [favoritado, setFavoritado] = useState(false);
  const [naEstante, setNaEstante] = useState(false);
  

  useEffect(() => {
    async function fetchStatus() {
      try {
        const favoritos = await getFavoritos();
        setFavoritado(favoritos.some((b) => b.id === livro.id));

        const estante = await getEstante();
        setNaEstante(estante.some((b) => b.id === livro.id));
      } catch (error) {
        console.error("Erro ao buscar status do livro:", error);
      }
    }
    fetchStatus();
  }, [livro]);

  const handleFavoriteToggle = async () => {
    try {
      if (favoritado) {
        await removeFavorito(livro.id);
      } else {
        await addFavorito(livro.id);
      }
      setFavoritado(!favoritado);
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const handleEstanteToggle = async () => {
    try {
      if (naEstante) {
        await removeLivroEstante(livro.id);
      } else {
        await addLivroEstante(livro);
        if (onAddBook) {
          onAddBook(livro); 
        }
      }
      setNaEstante(!naEstante);
    } catch (error) {
      console.error("Erro ao atualizar estante:", error);
    }
  };

  return (
    <BookCardWrapper>
      <BookCover
  style={{
    backgroundImage: livro?.imagem
      ? `url(http://localhost:8000/uploads/${livro.imagem})`
      : `url(https://via.placeholder.com/150x220?text=Sem+Imagem)`,
  }}
/>

        <FavWrapper onClick={handleFavoriteToggle}>
          <FavoritoSVG ativo={favoritado} />
        </FavWrapper>
        <Overlay>
          <BookTitle>{livro?.nome || "Título Indisponível"}</BookTitle>
          <BookDescription>{livro?.descricao || "Descrição não disponível"}</BookDescription>
        </Overlay>
      <ButtonWrapper>
        <Button onClick={handleEstanteToggle}>
          {naEstante ? (
            <>
              <MinusIcon /> Remover da Estante
            </>
          ) : (
            <>
              <PlusIcon /> Adicionar à Estante
            </>
          )}
        </Button>
      </ButtonWrapper>
    </BookCardWrapper>
  );
}

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default BookCard;
