import { useState, useEffect } from "react";
import styled from "styled-components";
import FormularioEstante from "../Components/FormularioEstante";
import BookCard from "../Components/BookCard";

const EstanteContainer = styled.div`
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
  transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const BooksGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

function MinhaEstante() {
  const [shelfBooks, setShelfBooks] = useState([]);


  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("minhaEstante")) || [];
    if (Array.isArray(storedBooks)) {
      setShelfBooks(storedBooks.filter((book) => book && book.nome)); 
    }
  }, []);

  const handleAddBook = (bookName) => {
    if (!bookName.trim()) return;

    const newBook = {
      id: Date.now(),
      nome: bookName,
      image: "https://via.placeholder.com/150x220?text=Livro",
      descricao: "Livro adicionado à estante",
    };

    setShelfBooks((prevBooks) => {
      const updatedBooks = [...prevBooks, newBook];
      localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
      return updatedBooks;
    });
  };

  return (
    <EstanteContainer>
      <Title>Minha Estante</Title>
      <FormularioEstante titulo="Adicionar Livro à Estante" onSubmit={handleAddBook} />

      {shelfBooks.length > 0 ? (
        <BooksGrid>
          {shelfBooks
            .filter((book) => book && book.nome)
            .map((book) => (
              <BookCard key={book.id} book={book} onClick={() => console.log("Livro clicado:", book.nome)} />
            ))}
        </BooksGrid>
      ) : (
        <p>Nenhum livro adicionado à estante.</p>
      )}
    </EstanteContainer>
  );
}

export default MinhaEstante;
