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

async function addLivro(formData) {
  try {
    const response = await livrosAPI.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar livro:", error);
    throw error;
  }
}

export { getLivros, addLivro };
