import styled from "styled-components";
import BookCard from "./BookCard";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.background};
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  gap: 15px;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
`;

function RecommendationCard({ book }) {
  if (!book) return null;

  return (
    <CardContainer>
      <Title>Que tal?</Title>
      <BookCard book={book} onClick={() => console.log("Livro recomendado:", book.nome)} />
    </CardContainer>
  );
}

export default RecommendationCard;