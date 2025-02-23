import axios from "axios";

const favoritosAPI = axios.create({
  baseURL: "http://localhost:8000/favoritos",
});

async function getFavoritos() {
  try {
    const response = await favoritosAPI.get("/");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar favoritos:", error.response?.data || error.message);
    throw new Error("Erro ao buscar favoritos.");
  }
}

async function addFavorito(id) {
  try {
    const response = await favoritosAPI.post(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao adicionar favorito:", error.response?.data || error.message);
    throw new Error("Erro ao adicionar favorito.");
  }
}

async function removeFavorito(id) {
  try {
    const response = await favoritosAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao remover favorito:", error.response?.data || error.message);
    throw new Error("Erro ao remover favorito.");
  }
}

export { getFavoritos, addFavorito, removeFavorito };
