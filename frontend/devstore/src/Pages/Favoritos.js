import { useState, useEffect } from "react";
import styled from "styled-components";
import BookCard from "../Components/BookCard";

const FavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 800px;
  padding: 20px;
  background: ${(props) => props.theme.background};
  border-radius: 10px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const BooksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
  }, []);

  return (
    <FavContainer>
      <h2>Meus Favoritos</h2>
      {favoritos.length > 0 ? (
        <BooksGrid>
          {favoritos.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))}
        </BooksGrid>
      ) : (
        <p>Nenhum favorito encontrado.</p>
      )}
    </FavContainer>
  );
}

export default Favoritos;
