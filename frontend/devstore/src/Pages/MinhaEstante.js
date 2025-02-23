import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { getEstante, removeLivroEstante } from "../services/estante";

function MinhaEstante() {
  const [estante, setEstante] = useState([]);

  useEffect(() => {
    async function fetchEstante() {
      const livros = await getEstante();
      setEstante(livros);
    }
    fetchEstante();
  }, []);

  const handleRemoveBook = async (idLivro) => {
    await removeLivroEstante(idLivro);
    setEstante(estante.filter(livro => livro.id !== idLivro));
  };

  return (
    <div>
      <h2>Minha Estante</h2>
      {estante.length > 0 ? (
        estante.map((livro) => (
          <BookCard key={livro.id} livro={livro} onRemoveBook={handleRemoveBook} />
        ))
      ) : (
        <p>Sua estante está vazia.</p>
      )}
    </div>
  );
}

export default MinhaEstante;
