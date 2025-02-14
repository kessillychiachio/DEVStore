import { useState, useEffect } from "react";
import SearchBar from "../Components/SearchBar";
import LatestReleases from "../Components/LatestReleases";
import RecommendationCard from "../Components/RecommendationCard";
import { livros } from "../assets/books";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBook, setRecommendedBook] = useState(null);

  useEffect(() => {
    if (livros.length > 0) {
      const randomIndex = Math.floor(Math.random() * livros.length);
      const randomBook = livros[randomIndex];

      console.log("Livro recomendado:", randomBook); // 🚀 Depuração
      setRecommendedBook(randomBook);
    } else {
      console.log("Nenhum livro encontrado! Verifique a importação.");
    }
  }, []);

  return (
    <div>
      <SearchBar onBookSelect={setSelectedBook} />
      <LatestReleases onBookSelect={setSelectedBook} />
      {recommendedBook && <RecommendationCard book={recommendedBook} />}
    </div>
  );
}

export default Home;