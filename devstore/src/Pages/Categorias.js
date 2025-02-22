import {useState} from "react";
import { styled } from "styled-components";
import books from "../Assets/books";
import { Title } from "../Components/Title";

const Categorias = [...new Set(books.map((livro => livro.categoria )))];

const CategoriesContainer = styled.div`
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

const CategoriesList = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
justify-content: center;
`

