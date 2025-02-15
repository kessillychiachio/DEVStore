import styled from "styled-components";
import Button from "./Button";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.primary};
  padding: 15px;
  text-align: center;
  width: 220px;
  height: 460px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(12px);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => props.theme.secondary};
  }
`;

const BookImage = styled.img`
  width: 100%;
`;

const BookInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BookTitle = styled.h3`
  color: ${(props) => props.theme.text};
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
`;

const BookDescription = styled.p`
  color: black;
  font-size: 14px;
  margin-top: 5px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: auto;
  background: none;
`;

function BookCard({ livro, onClick }) {
  const storedBooks = JSON.parse(localStorage.getItem("minhaEstante")) || [];
  const isBookAlreadyAdded = storedBooks.some((b) => b.nome === livro.nome);

  const handleAddToShelf = () => {
    if (!isBookAlreadyAdded) {
      const updatedBooks = [...storedBooks, livro];
      localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
      alert("Livro adicionado à estante!");
    }
  };

  return (
    <Card>
      <BookImage src={livro.imagem} alt={livro.nome} />
      <BookInfo>
        <BookTitle>{livro.nome}</BookTitle>
        <BookDescription>{livro.descricao}</BookDescription>
      </BookInfo>
      <ButtonWrapper>
        <Button onClick={handleAddToShelf} disabled={isBookAlreadyAdded}>
          {isBookAlreadyAdded ? "Já na Estante" : "Adicionar à Estante"}
        </Button>
      </ButtonWrapper>
    </Card>
  );
}

export default BookCard;