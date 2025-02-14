import { useState, useEffect } from "react";
import styled from "styled-components";
import Formulario from "../Components/Formulario";

const CategoriasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 800px;
  padding: 20px;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
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

const CategoriesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const CategoryItem = styled.li`
  background: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.text};
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${(props) => props.theme.primary};
  }
`;

function Categorias() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categorias")) || [];
    setCategories(storedCategories);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCategory = formData.get("Categoria");

    if (!newCategory.trim()) {
      alert("Digite um nome para a categoria!");
      return;
    }

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem("categorias", JSON.stringify(updatedCategories));
    e.target.reset();
  };

  return (
    <CategoriasContainer>
      <Title>Gerenciar Categorias</Title>
      <Formulario titulo="Adicionar Categoria" campos={["Categoria"]} onSubmit={handleSubmit} />
      <CategoriesList>
        {categories.length === 0 ? (
          <p>Nenhuma categoria adicionada ainda.</p>
        ) : (
          categories.map((category, index) => (
            <CategoryItem key={index}>{category}</CategoryItem>
          ))
        )}
      </CategoriesList>
    </CategoriasContainer>
  );
}

export default Categorias;