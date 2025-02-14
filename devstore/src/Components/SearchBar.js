import styled from "styled-components";
import { useState } from "react";
import { livros } from "../assets/books";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #black;
  margin: 5px 0 15px 0;
`;

const SearchInput = styled.input`
  justify-content: center;
  width: 100%;
  padding: 12px;
  border: 1px solid;
  border-radius: 24px;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: black;

  &::placeholder {
    color: #black;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin-top: 15px;
`;

const BookCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 120px;
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  p {
    color: white;
    font-size: 14px;
    margin-top: 5px;
  }
`;

function SearchBar({ onBookSelect }) {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    if (searchTerm.length === 0) {
      setFilteredBooks([]);
    } else {
      const filtered = livros.filter((livro) =>
        livro.nome.toLowerCase().includes(searchTerm)
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <SearchContainer>
      <Title>Já sabe por onde começar?</Title>
      <Subtitle>Encontre seu produto</Subtitle>
      <SearchInput
        type="text"
        placeholder="Pesquisar livros..."
        value={query}
        onChange={handleSearch}
      />
      {query.length > 0 && filteredBooks.length > 0 && (
        <ResultsContainer>
          {filteredBooks.map((livro) => (
            <BookCard key={livro.id} onClick={() => onBookSelect(livro)}>
              <img src={livro.imagem} alt={livro.nome} />
              <p>{livro.nome}</p>
            </BookCard>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

export default SearchBar;