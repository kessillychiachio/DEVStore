import { useEffect, useState } from "react";
import styled from "styled-components";
import { getLivros } from "../services/livros";
import BookCard from "../components/BookCard";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 20px auto;
  max-width: 600px;
  padding: 30px;
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

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff416c, #1e90ff);
    border-radius: inherit;
    z-index: -1;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid ${(props) => props.theme.border};
  outline: none;
  font-size: 16px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: border 0.3s ease-in-out, box-shadow 0.3s ease-in-out;


  &:focus {
    border-color: ${(props) => props.theme.secondary};
    box-shadow: 0px 0px 4px ${(props) => props.theme.primary};
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 50px;
  margin: 40px auto;
  width: 100%;
  max-width: 800px; 
  padding: 10px;
  background: ${(props) => props.theme.background};
  backdrop-filter: blur(10px);
  text-align: center;
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
  place-items: center; 
  border-bottom: 90px;
`;


function SearchBar({ onBookSelect }) {
  const [livros, setLivros] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

 useEffect(() => {
  const fetchLivros = async () => {
    try {
      const data = await getLivros();
      if (Array.isArray(data)) {
        setLivros(data.map(livro => ({
          ...livro,
          imagem: livro.imagem && livro.imagem.trim() !== "" 
            ? livro.imagem 
            : "https://via.placeholder.com/150x220?text=Sem+Imagem"
        })));
      } else {
        console.error("Dados inválidos recebidos do backend:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  fetchLivros();
}, []);


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
      <SearchInputWrapper>
        <SearchInput
          type="text"
          placeholder="Pesquisar livros..."
          value={query}
          onChange={handleSearch}
        />
      </SearchInputWrapper>
      {query.length > 0 && filteredBooks.length > 0 && (
        <ResultsContainer>
          {filteredBooks.map((livro) => (
            <BookCard key={livro.id} livro={livro} onBookSelect={onBookSelect} />
          ))}
        </ResultsContainer>
      )}
    </SearchContainer>
  );
}

export default SearchBar;
