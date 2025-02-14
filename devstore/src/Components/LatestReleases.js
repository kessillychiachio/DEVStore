import styled from "styled-components";
import BookCard from "./BookCard";

const ReleasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  width: 90%;
`;

const BooksContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px;
`;

function LatestReleases({ books }) {
  const handleBookClick = (book) => {
    console.log("Livro selecionado:", book.title);
  };

  return (
    <ReleasesContainer>
      <h2 style={{ color: "white" }}>Últimos Lançamentos</h2>
      <BooksContainer>
        {books.map((book, index) => (
          <BookCard key={index} book={book} onClick={handleBookClick} />
        ))}
      </BooksContainer>
    </ReleasesContainer>
  );
}

export default LatestReleases;