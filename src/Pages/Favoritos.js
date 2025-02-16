import { useState, useEffect } from "react";
import { getFavoritos } from "../servicos/favoritos";
import { Title } from "../Components/Title";
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

  async function fetchFavoritos() {
    try {
      const favoritosApi = await getFavoritos();
      console.log("Favoritos recebidos da API:", favoritosApi); 
      setFavoritos(favoritosApi);
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
    }
  }

  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <FavContainer>
      <Title>Meus Favoritos</Title>
      {favoritos.length > 0 ? (
        <BooksGrid>
          {favoritos.map((favorito) => (
            <BookCard key={favorito.id} book={favorito} onClick={() => console.log("Livro favorito clicado:", favorito.nome)} />
          ))}
        </BooksGrid>
      ) : (
        <p>Nenhum favorito encontrado.</p>
      )}
    </FavContainer>
  );
}

export default Favoritos;
