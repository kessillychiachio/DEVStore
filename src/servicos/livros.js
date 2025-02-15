import axios from "axios";

const livrosAPI = axios.create({
  baseURL: "http://localhost:8000/livros",
});

async function getLivros() {
  try {
    const response = await livrosAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return []; 
  }
}

export { getLivros };
