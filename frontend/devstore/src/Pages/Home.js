import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LatestReleases from "../components/LatestReleases";
import RecommendationCard from "../components/RecommendationCard";
import { getLivros } from "../services/livros";

function Home() {
  const [setSelectedBook] = useState(null);
  const [recommendedBook, setRecommendedBook] = useState(null);

  useEffect(() => {
    async function fetchRecommendedBook() {
      try {
        const livros = await getLivros();

        if (!livros || livros.length === 0) {
          console.error("Erro: Nenhum livro encontrado!");
          return;
        }

        let randomBook;
        do {
          randomBook = livros[Math.floor(Math.random() * livros.length)];
        } while (randomBook === recommendedBook);

        setRecommendedBook(randomBook);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    fetchRecommendedBook();
  }, []);

  function handleAddBook(livro) {
    const minhaEstante = JSON.parse(localStorage.getItem("minhaEstante")) || [];

    if (!minhaEstante.some((b) => b.id === livro.id)) {
      const novaEstante = [...minhaEstante, livro];
      localStorage.setItem("minhaEstante", JSON.stringify(novaEstante));
      console.log(`📚 Livro "${livro.nome}" adicionado à estante.`);
    }
  }

  return (
    <div>
      <SearchBar onBookSelect={setSelectedBook} />
      <LatestReleases onBookSelect={setSelectedBook} onAddBook={handleAddBook} />
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
