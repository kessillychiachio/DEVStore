import Formulario from "../Components/Formulario";

function MinhaEstante() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Livro adicionado à estante!");
  };

  return <Formulario titulo="Adicionar à Estante" campos={["Título do livro", "Autor"]} onSubmit={handleSubmit} />;
}

export default MinhaEstante;