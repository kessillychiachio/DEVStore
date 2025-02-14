import { useState } from "react";
import SearchBar from "../Components/SearchBar";
import BookCard from "../Components/BookCard";
import LatestReleases from "../Components/LatestReleases";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div>
      <SearchBar onBookSelect={setSelectedBook} />
      {selectedBook && (
        <BookCard
          book={{
            title: selectedBook.nome,
            image: selectedBook.imagem,
            description: selectedBook.descricao,
          }}
        />
      )}
      <LatestReleases onBookSelect={setSelectedBook} />
    </div>
  );
}

export default Home;