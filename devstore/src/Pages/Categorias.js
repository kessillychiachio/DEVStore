import Formulario from "../Components/Formulario";

function Categorias() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Categoria cadastrada!");
  };

  return <Formulario titulo="Adicionar Categoria" campos={["Nome da categoria"]} onSubmit={handleSubmit} />;
}

export default Categorias;