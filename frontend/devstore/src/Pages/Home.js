import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LatestReleases from "../components/LatestReleases";
import RecommendationCard from "../components/RecommendationCard";
import { getLivros } from "../services/livros";
import { addLivroEstante } from "../services/estante";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBook, setRecommendedBook] = useState(null);

  useEffect(() => {
    async function fetchRecommendedBook() {
      try {
        const livros = await getLivros();

        if (!livros || livros.length === 0) {
          console.error("Erro: Nenhum livro encontrado!");
          return;
        }

        const randomBook = livros[Math.floor(Math.random() * livros.length)];
        setRecommendedBook(randomBook);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      }
    }

    fetchRecommendedBook();
  }, []);

  async function handleAddBook(livro) {
    if (!livro || !livro.id || !livro.nome || !livro.autor) {
      console.error("❌ Erro: Livro inválido!", livro);
      return;
    }
  
    try {
      const livroCompleto = {
        id: livro.id,
        nome: livro.nome,
        autor: livro.autor || "Autor desconhecido",
        descricao: livro.descricao || "Sem descrição disponível",
        imagem: livro.imagem || null
      };
  
      const livroAdicionado = await addLivroEstante(livroCompleto);
    
      if (livroAdicionado) {
        console.log(`📚 Livro "${livroCompleto.nome}" adicionado à estante no backend.`);
      } else {
        console.error("Erro ao adicionar o livro no backend.");
      }
    } catch (error) {
      console.error("Erro ao enviar livro para a estante:", error);
    }
  }  

  return (
    <div>
      <SearchBar onBookSelect={(livro) => {
        console.log("✅ Livro selecionado na SearchBar:", livro);
        setSelectedBook(livro);
      }} />

      <LatestReleases onBookSelect={(livro) => {
        console.log("✅ Livro selecionado em LatestReleases:", livro);
        setSelectedBook(livro);
      }} onAddBook={handleAddBook} />

      {selectedBook && (
        <div>
          <h2>Livro Selecionado:</h2>
          <p>{selectedBook.nome}</p>
          <p>Autor: {selectedBook.autor}</p>
        </div>
      )}

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
