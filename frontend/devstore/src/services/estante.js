import axios from "axios";

const estanteAPI = axios.create({
  baseURL: "http://localhost:8000/estante",
});

async function getEstante() {
  try {
    const response = await estanteAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estante:", error);
    return [];
  }
}

async function addLivroEstante(livro) {
  try {
    await estanteAPI.post("/", livro);
  } catch (error) {
    console.error("Erro ao adicionar livro à estante:", error);
  }
}

async function removeLivroEstante(id) {
  try {
    await estanteAPI.delete(`/${id}`);
  } catch (error) {
    console.error("Erro ao remover livro da estante:", error);
  }
}

export { getEstante, addLivroEstante, removeLivroEstante };
