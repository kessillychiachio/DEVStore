import Formulario from "../Components/Formulario";

function Sacola() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Livro adicionado à sacola!");
  };

  return <Formulario titulo="Adicionar à Sacola" campos={["Título do livro", "Quantidade"]} onSubmit={handleSubmit} />;
}

export default Sacola;