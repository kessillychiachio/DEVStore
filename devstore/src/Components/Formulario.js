import styled from "styled-components";
import { Title } from "./Title";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid transparent;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;

  &:focus {
    border-color: #00d4ff;
    box-shadow: 0px 0px 10px rgba(0, 212, 255, 0.8);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #007bff, #00d4ff);
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  letter-spacing: 1px;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(90deg, #0056b3, #0097e6);
    box-shadow: 0px 0px 15px rgba(0, 212, 255, 0.8);
  }
`;

function Formulario({ titulo, campos = [], onSubmit }) { // 👈 Aqui garantimos que `campos` sempre será um array
  return (
    <FormContainer onSubmit={onSubmit}>
      <Title text={titulo} size="24px" color="#fff" uppercase />

      {campos.map((campo, index) => (
        <Input key={index} type="text" placeholder={campo} required />
      ))}

      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default Formulario;