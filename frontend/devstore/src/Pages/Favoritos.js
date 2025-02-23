import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import styled from "styled-components";

const FavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 1000px;
  padding: 20px;
  background: ${(props) => props.theme.background};
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const BooksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  min-width: 300px;
`;

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
  }, []);

  const handleRemoveFavorite = (nomeLivro) => {
    const updatedFavoritos = favoritos.filter((livro) => livro.nome !== nomeLivro);
    setFavoritos(updatedFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));
  };

  return (
    <FavContainer>
      <Title>Meus Favoritos</Title>
      <BooksGrid>
        {favoritos.length > 0 ? (
          favoritos.map((livro) => (
            <BookCard key={livro.nome} livro={livro} onRemoveFavorite={handleRemoveFavorite} />
          ))
        ) : (
          <p>Nenhum livro favoritado ainda.</p>
        )}
      </BooksGrid>
    </FavContainer>
  );
}

export default Favoritos;
