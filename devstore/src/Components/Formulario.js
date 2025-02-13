import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #0056b3;
  }
`;

function Formulario({ titulo, campos, onSubmit }) {
  return (
    <FormContainer onSubmit={onSubmit}>
      <h2>{titulo}</h2>
      {campos.map((campo, index) => (
        <Input key={index} type="text" placeholder={campo} required />
      ))}
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default Formulario;