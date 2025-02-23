const { getTodosFavoritos, insereFavorito, deletarFavoritoPorId } = require("../servicos/favorito");
const { getLivroPorId } = require("../servicos/livro"); 

function getFavoritos(req, res) {
    try {
        const livros = getTodosFavoritos();
        res.status(200).json(livros);
    } catch (error) {
        console.error("❌ Erro no GET /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar favoritos", erro: error.message });
    }
}

function postFavorito(req, res) {
    try {
        const id = req.params.id;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        const livro = getLivroPorId(id); 
        if (!livro) {
            return res.status(404).json({ mensagem: "Livro não encontrado" });
        }

        insereFavorito(livro.id);
        res.status(201).json({ mensagem: "Livro favoritado com sucesso", favorito: livro });
    } catch (error) {
        console.error("❌ Erro no POST /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao inserir favorito", erro: error.message });
    }
}

function deleteFavorito(req, res) {
    try {
        const id = req.params.id;
        if (!id || isNaN(Number(id))) {
            return res.status(422).json({ mensagem: "ID inválido" });
        }

        deletarFavoritoPorId(id);
        res.status(200).json({ mensagem: "Favorito removido com sucesso" });
    } catch (error) {
        console.error("❌ Erro no DELETE /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao deletar favorito", erro: error.message });
    }
}

module.exports = {
    getFavoritos,
    postFavorito,
    deleteFavorito
};
