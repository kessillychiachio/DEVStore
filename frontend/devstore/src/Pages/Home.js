import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LatestReleases from "../components/LatestReleases";
import RecommendationCard from "../components/RecommendationCard";
import { livros } from "../assets/books";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBook, setRecommendedBook] = useState(null);

  useEffect(() => {
    if (!livros || livros.length === 0) {
      console.error("Erro: Nenhum livro encontrado! Verifique a importação.");
      return;
    }

    let randomBook;
    do {
      randomBook = livros[Math.floor(Math.random() * livros.length)];
    } while (randomBook === recommendedBook);

    setRecommendedBook(randomBook);
  }, []);

  return (
    <div>
      <SearchBar onBookSelect={setSelectedBook} />
      <LatestReleases onBookSelect={setSelectedBook} />
      {recommendedBook ? (
        <RecommendationCard book={recommendedBook} />
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>
          Nenhum livro disponível para recomendação.
        </p>
      )}
    </div>
  );
}

export default Home;
