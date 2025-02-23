import styled from "styled-components";
import { livros } from "../assets/books";
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

function LatestReleases({ onBookSelect }) {
  const latestBooks = livros.slice(-4); 

  return (
    <LatestReleasesContainer>
      <Title>Últimos Lançamentos</Title>
      <BooksContainer>
        {latestBooks.map((livro) => (
          <BookCard
            key={livro.id}
            livro={livro}
            onClick={() => onBookSelect(livro)}
          />
        ))}
      </BooksContainer>
    </LatestReleasesContainer>
  );
}

export default LatestReleases;