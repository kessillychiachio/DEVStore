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

async function addFavorito(id) {
  try {
    await favoritosAPI.post(`/${id}`);
  } catch (error) {
    console.error("Erro ao adicionar favorito:", error);
  }
}

async function removeFavorito(id) {
  try {
    await favoritosAPI.delete(`/${id}`);
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
  }
}

export { getFavoritos, addFavorito, removeFavorito };
