import axios from "axios";

const favoritosAPI = axios.create({
  baseURL: "http://localhost:8000/favoritos",
});

async function getFavoritos() {
  try {
    const response = await favoritosAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return []; 
  }
}

export { getFavoritos };
