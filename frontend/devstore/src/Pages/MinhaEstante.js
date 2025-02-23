import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { getEstante, addLivroEstante, removeLivroEstante } from "../services/estante";
import styled from "styled-components";

const ShelfContainer = styled.div`
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${(props) => props.theme.background};
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 5px;
`;

const Button = styled.button`
  background: ${(props) => props.theme.primary};
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.secondary};
  }
`;

function MinhaEstante() {
  const [estante, setEstante] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    autor: "", 
    descricao: "",
    imagem: "",
  });

  useEffect(() => {
    async function fetchEstante() {
      try {
        const livros = await getEstante();
        setEstante(livros);
      } catch (error) {
        console.error("Erro ao buscar estante:", error);
      }
    }
    fetchEstante();
  }, []);

  const handleRemoveBook = async (idLivro) => {
    await removeLivroEstante(idLivro);
    setEstante((prev) => prev.filter((livro) => livro.id !== idLivro));
  };

  const handleAddBook = async (event) => {
    event.preventDefault();

    if (!formData.nome || !formData.autor || !formData.descricao) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const novoLivro = {
      id: Date.now(), 
      nome: formData.nome,
      autor: formData.autor, 
      descricao: formData.descricao,
      imagem: formData.imagem || "default.jpg",
    };

    try {
      await addLivroEstante(novoLivro);
      setEstante((prev) => [...prev, novoLivro]);
      setFormData({ nome: "", autor: "", descricao: "", imagem: "" });
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <ShelfContainer>
      <Title>Minha Estante</Title>

      <BooksGrid>
        {estante.length > 0 ? (
          estante.map((livro) => (
            <BookCard key={livro.id} livro={livro} onRemoveBook={handleRemoveBook} />
          ))
        ) : (
          <p>Sua estante está vazia.</p>
        )}
      </BooksGrid>

      <p></p>
      <Title>Gostaria de adicionar um livro?</Title>

      <FormContainer onSubmit={handleAddBook}>
        <Input
          type="text"
          placeholder="Título do Livro"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Autor do Livro"
          value={formData.autor}
          onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          required
        />
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, imagem: e.target.files[0] })}
        />
        <Button type="submit">Adicionar Livro</Button>
      </FormContainer>
    </ShelfContainer>
  );
}

export default MinhaEstante;
