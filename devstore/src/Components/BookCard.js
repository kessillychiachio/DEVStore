import styled from "styled-components";

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  width: 200px;
  transition: transform 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  }

  img {
    width: 100%;
    border-radius: 5px;
  }

  h3 {
    color: white;
    font-size: 16px;
    margin-top: 5px;
  }

  p {
    color: #ccc;
    font-size: 12px;
    margin-top: 5px;
  }

  button {
    background: linear-gradient(90deg, #007bff, #00d4ff);
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    margin-top: 5px;

    &:hover {
      background: linear-gradient(90deg, #0056b3, #0097e6);
    }
  }
`;

function BookCard({ book, onClick }) {
  return (
    <Card onClick={() => onClick(book)}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <button>Ver detalhes</button>
    </Card>
  );
}

export default BookCard;