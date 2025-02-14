import { useState } from "react";
import styled from "styled-components";
import { livros } from "../assets/books";
import { Title } from "./Title";
import { rgba } from "polished";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  margin: 40px auto;
  background: ${({ theme }) => rgba(theme.special, 0.8)};
  padding: 25px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  text-align: center;
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const Select = styled.select`
  padding: 14px;
  border-radius: 20px;
  outline: none;
  font-size: 18px;
  transition: 0.3s;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  text-align: center;
  cursor: pointer;

  &:focus {
    border-color: ${(props) => props.theme.secondary};
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.primary};
  background-color: transparent;
  padding: 14px;
  border: none;
  cursor: pointer;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.05);
  }
`;

function FormularioEstante({ titulo, onSubmit }) {
  const [selectedBook, setSelectedBook] = useState(""); // Estado para armazenar o livro selecionado

  const handleChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedBook);
    setSelectedBook("");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title text={titulo} size="18px" color="white" uppercase />

      <Select name="Título do livro" value={selectedBook} onChange={handleChange} required>
        <option value="">Selecione um livro</option>
        {livros.map((livro) => (
          <option key={livro.id} value={livro.nome}>
            {livro.nome}
          </option>
        ))}
      </Select>

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default FormularioEstante;