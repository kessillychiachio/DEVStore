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
  background: ${(props) => props.theme.background};
  backdrop-filter: blur(8px);
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.textSecondary};
  margin: 5px 0 15px 0;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => props.theme.border};
  border-radius:20px;
  outline: none;
  font-size: 16px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &::placeholder {
    color: ${(props) => props.theme.textSecondary};
  }

  &:focus {
    border-color: ${(props) => props.theme.secondary};
    box-shadow: 0px 0px 4px ${(props) => props.theme.primary};
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
  background: ${(props) => props.theme.primary};
  padding: 10px;
  text-align: center;
  width: 300px;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.primary};
  }
`;

const BookTitle = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const BookImage = styled.img`
  width: 100%;
  border-radius: 15px;
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
              <BookTitle>{livro.nome}</BookTitle>
              <BookImage src={livro.imagem} alt={livro.nome} />
            </BookCard>
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

export default SearchBar;