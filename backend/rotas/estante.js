const { Router } = require("express");
const { getEstante, removerLivroEstante } = require("../servicos/estante");

const router = Router();

router.get("/", (req, res) => {
    try {
        const estante = getEstante();
        res.json(estante);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar estante", detalhe: error.message });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        removerLivroEstante(id);
        res.json({ mensagem: "Livro removido da estante" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover livro da estante", detalhe: error.message });
    }
});

module.exports = router;
