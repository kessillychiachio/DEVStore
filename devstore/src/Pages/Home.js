import Formulario from "../Components/Formulario";

function Home() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Bem-vindo à Loja de Livros!");
  };

  return <Formulario titulo="Bem-vindo!" campos={["Digite seu nome"]} onSubmit={handleSubmit} />;
}

export default Home;