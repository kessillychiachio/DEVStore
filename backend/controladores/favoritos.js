const { getTodosFavoritos, insereFavorito, deletarFavoritoPorId } = require("../servicos/favorito");

function getFavoritos(req, res) {
    try {
        const livros = getTodosFavoritos();
        if (!Array.isArray(livros)) {
            throw new Error("Erro interno: Dados retornados não são um array");
        }
        res.status(200).json(livros); 
    } catch (error) {
        console.error("Erro no GET /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar favoritos", erro: error.message });
    }
}

function postFavorito(req, res) {
    try {
        const { id } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ mensagem: "ID inválido" });
        }

        insereFavorito(id);
        res.status(201).json({ mensagem: "Livro inserido com sucesso" });
    } catch (error) {
        console.error("Erro no POST /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao inserir favorito", erro: error.message });
    }
}

function deleteFavorito(req, res) {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(422).json({ mensagem: "ID inválido" });
        }

        deletarFavoritoPorId(id);
        res.status(200).json({ mensagem: "Favorito deletado com sucesso" });
    } catch (error) {
        console.error("Erro no DELETE /favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao deletar favorito", erro: error.message });
    }
}

module.exports = {
    getFavoritos,
    postFavorito,
    deleteFavorito
};
