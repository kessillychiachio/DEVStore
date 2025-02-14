import styled from "styled-components";
import Button from "./Button";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.secondary};
  border-radius: 20px;
  padding: 15px;
  text-align: center;
  width: 220px;
  height: 460px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(12px);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 12px ${(props) => props.theme.primary};
    background: ${(props) => props.theme.secondary};
  }
`;

const BookImage = styled.img`
  width: 100%;
  border-radius: 8px;
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
  font-weight: 900;
  font-size: 16px;
  font-weight: bold;
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
`;

function BookCard({ book, onClick }) {
  const handleAddToShelf = () => {
    const storedBooks = JSON.parse(localStorage.getItem("minhaEstante")) || [];
    const isBookAlreadyAdded = storedBooks.some((b) => b.id === book.id);

    if (!isBookAlreadyAdded) {
      const updatedBooks = [...storedBooks, book];
      localStorage.setItem("minhaEstante", JSON.stringify(updatedBooks));
      alert("Livro adicionado à estante!");
    } else {
      alert("Este livro já está na sua estante!");
    }
  };

  return (
    <Card>
      <BookImage src={book.image} alt={book.title} />
      <BookInfo>
        <BookTitle>{book.title}</BookTitle>
        <BookDescription>{book.description}</BookDescription>
      </BookInfo>
      <ButtonWrapper>
        <Button onClick={handleAddToShelf}>Adicionar à Estante</Button>
      </ButtonWrapper>
    </Card>
  );
}

export default BookCard;