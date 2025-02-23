import styled from "styled-components";
import { Title } from "./Title";
import {rgba} from "polished";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 300px;
  margin: 40px auto;
  background: ${({theme}) => rgba(theme.special, 0.8)};
  padding: 25px;
  border-radius: 20px;
  box-shadow: 1px 1px 1px 1px ${(props) => props.theme.textSecondary};
  backdrop-filter: blur(20px);
  text-align: center;
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const Input = styled.input`
  padding: 14px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 20px;
  outline: none;
  font-size: 14px;
  transition: 0.3s;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  text-align: center;

  &:focus {
    border-color: ${(props) => props.theme.secondary};
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.text};
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

function FormularioCategoria({ titulo, campos = [], onSubmit }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <Title text={titulo} size="18px" color="inherit" uppercase />
      {campos.map((campo, index) => (
        <Input key={index} type="text" placeholder={campo} required />
      ))}
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default FormularioCategoria;