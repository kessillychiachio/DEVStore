import { useState, useEffect } from "react";
import styled from "styled-components";
import FormularioEstante from "../Components/FormularioEstante";
import BookCard from "../Components/BookCard";
import { livros } from "../assets/books";

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
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
`;

function MinhaEstante() {
  const [shelfBooks, setShelfBooks] = useState([]);

  // Recuperar livros do localStorage ao carregar a página
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("minhaEstante")) || [];
    setShelfBooks(storedBooks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("Título do livro");

    if (!title.trim()) {
      alert("Selecione um livro!");
      return;
    }

    // Encontrar o livro correspondente na lista importada
    const selectedBook = livros.find((livro) => livro.nome === title);

    if (!selectedBook) {
      alert("Livro não encontrado na lista!");
      return;
    }

    // Verificar se o livro já está na estante
    const alreadyInShelf = shelfBooks.some((book) => book.nome === title);
    if (alreadyInShelf) {
      alert("Este livro já está na sua estante!");
      return;
    }

    const newBook = {
      id: Date.now(),
      nome: selectedBook.nome,
      descricao: `Autor: ${selectedBook.autor}`,
      imagem: selectedBook.imagem || "https://via.placeholder.com/120x180?text=Livro",
    };

    const updatedBooks = [...shelfBooks, newBook];
    setShelfBooks(updatedBooks);
    localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
    e.target.reset();
    alert("Livro adicionado à estante!");
  };

  const removeBook = (id) => {
    const updatedBooks = shelfBooks.filter((book) => book.id !== id);
    setShelfBooks(updatedBooks);
    localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
  };

  return (
    <EstanteContainer>
      <Title>Minha Estante</Title>
      <FormularioEstante titulo="Adicionar à Estante" onSubmit={handleSubmit} />
      {shelfBooks.length === 0 ? (
        <p>Sua estante está vazia. Adicione alguns livros!</p>
      ) : (
        <BooksContainer>
          {shelfBooks.map((book) => (
            <BookCard key={book.id} book={book} onClick={() => removeBook(book.id)} />
          ))}
        </BooksContainer>
      )}
    </EstanteContainer>
  );
}

export default MinhaEstante;