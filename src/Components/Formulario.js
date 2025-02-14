import styled from "styled-components";
import { Title } from "./Title";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 40px auto;
  background: ${(props) => props.theme.background};
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px ${(props) => props.theme.text};
  backdrop-filter: blur(10px);
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
    box-shadow: 0px 0px 10px ${(props) => props.theme.secondary};
  }
`;

const Button = styled.button`
  color: ${(props) => props.theme.text};
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

function Formulario({ titulo, campos = [], onSubmit }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <Title text={titulo} size="26px" color="inherit" uppercase />
      {campos.map((campo, index) => (
        <Input key={index} type="text" placeholder={campo} required />
      ))}
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default Formulario;