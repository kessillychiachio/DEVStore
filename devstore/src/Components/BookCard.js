import styled from "styled-components";
import Button from "./Button";

const Card = styled.div`
  background: ${(props) => props.theme.secondary};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  width: 220px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(12px);
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.border};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 12px ${(props) => props.theme.primary};
    background: ${(props) => props.theme.secondary};
  }

  img {
    width: 100%;
    border-radius: 8px;
  }

  h3 {
    color: ${(props) => props.theme.text};
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
  }

  p {
    color: ${(props) => props.theme.textSecondary};
    font-size: 14px;
    margin-top: 5px;
  }

  button {
    margin-top: 10px;
  }
`;

function BookCard({ book, onClick }) {
  return (
    <Card onClick={() => onClick(book)}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <Button>Ver detalhes</Button>
    </Card>
  );
}

export default BookCard;