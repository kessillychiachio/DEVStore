import axios from "axios";

const estanteAPI = axios.create({
  baseURL: "http://localhost:8000/estante",
});

async function getEstante() {
  try {
    const response = await estanteAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar estante:", error);
    return [];
  }
}

async function addLivroEstante(id) {
  try {
    const response = await estanteAPI.post(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao adicionar livro à estante:", error);
  }
}

async function removeLivroEstante(id) {
  try {
    const response = await estanteAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao remover livro da estante:", error);
  }
}

export { getEstante, addLivroEstante, removeLivroEstante };
