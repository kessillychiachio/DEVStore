import axios from "axios";

const estanteAPI = axios.create({
  baseURL: "http://localhost:8000/estante",
});

async function getEstante() {
  try {
    const response = await estanteAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estante:", error.response?.data || error.message);
    return [];
  }
}

async function addLivroEstante(livro) {
  try {
    const livroFormatado = {
      id: livro.id,
      nome: livro.nome,
      autor: livro.autor,
      descricao: livro.descricao || "Sem descrição",
    };

    console.log("Enviando para API:", livroFormatado);

    const response = await estanteAPI.post("/", livroFormatado);
    console.log("Livro adicionado com sucesso!", response.data);
    return response.data.livro;
  } catch (error) {
    console.error("Erro ao adicionar livro à estante:", error.response?.data || error.message);
    return null;
  }
}

async function removeLivroEstante(id) {
  try {
    console.log(`Removendo livro ID: ${id} da estante...`);
    const response = await estanteAPI.delete(`/${id}`);
    console.log("Livro removido da estante com sucesso!", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover livro da estante:", error.response?.data || error.message);
    return null;
  }
}

export { getEstante, addLivroEstante, removeLivroEstante };
