import styled from "styled-components";
import { useState, useEffect } from "react";
import { getLivros } from "../services/livros";
import BookCard from "./BookCard";

const LatestReleasesContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 40px auto;
  width: 100%;
  padding: 20px;
  background: ${(props) => props.theme.background};
  backdrop-filter: blur(10px);
  text-align: center;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin: 0;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

function LatestReleases({ onBookSelect, onAddBook }) {
  const [latestBooks, setLatestBooks] = useState([]);

  useEffect(() => {
    async function fetchLatestBooks() {
      try {
        const livrosDaAPI = await getLivros();
        setLatestBooks(livrosDaAPI.slice(-4));
      } catch (error) {
        console.error("Erro ao buscar os últimos lançamentos:", error);
      }
    }

    fetchLatestBooks();
  }, []);

  return (
    <LatestReleasesContainer>
      <Title>Últimos Lançamentos</Title>
      <BooksContainer>
        {latestBooks.length > 0 ? (
          latestBooks.map((livro) => (
            <BookCard
              key={livro.id}
              livro={livro}
              onClick={() => onBookSelect(livro)}
              onAddBook={onAddBook} 
            />
          ))
        ) : (
          <p>Nenhum lançamento encontrado.</p>
        )}
      </BooksContainer>
    </LatestReleasesContainer>
  );
}

export default LatestReleases;
