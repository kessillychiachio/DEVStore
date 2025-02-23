import { useState } from "react";
import styled from "styled-components";
import { addLivro } from "../services/livros";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: ${(props) => props.theme.background};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
`;

const FileInput = styled.input`
  border: none;
`;

const Button = styled.button`
  padding: 10px;
  background: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.secondary};
  }
`;

function AddBookForm({ onBookAdded }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    imagem: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imagem: e.target.files[0], 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("nome", formData.nome);
    formDataToSend.append("descricao", formData.descricao);
    formDataToSend.append("imagem", formData.imagem);

    try {
      await addLivro(formDataToSend);
      alert("Livro adicionado com sucesso!");
      setFormData({ nome: "", descricao: "", imagem: null });
      onBookAdded(); // Atualiza a lista de livros
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      alert("Erro ao adicionar livro!");
    }
  };

  return (
    <FormContainer>
      <h2>Adicionar Livro</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nome"
          placeholder="Nome do Livro"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <TextArea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          rows="4"
          required
        />
        <FileInput type="file" accept="image/*" onChange={handleFileChange} required />
        <Button type="submit">Adicionar Livro</Button>
      </Form>
    </FormContainer>
  );
}

export default AddBookForm;
