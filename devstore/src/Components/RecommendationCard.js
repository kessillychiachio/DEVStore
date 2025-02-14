import styled from "styled-components";
import BookCard from "./BookCard";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  margin: 20px auto;
  gap: 15px;
  backdrop-filter: blur(10px);
`;

function RecommendationCard({ book }) {
  return (
    <CardContainer>
      <BookCard book={book} onClick={() => console.log("Livro recomendado:", book.title)} />
    </CardContainer>
  );
}

export default RecommendationCard;