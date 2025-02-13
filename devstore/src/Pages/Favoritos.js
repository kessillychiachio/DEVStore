import Formulario from "../Components/Formulario";

function Favoritos() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Livro favoritado!");
  };

  return <Formulario titulo="Adicionar aos Favoritos" campos={["Título do livro"]} onSubmit={handleSubmit} />;
}

export default Favoritos;