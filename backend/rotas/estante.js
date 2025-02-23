const { Router } = require("express");
const { getMinhaEstante, addLivroEstante, removeLivroEstante } = require("../servicos/estante");

const router = Router();

router.get("/", (req, res) => {
    try {
        const estante = getMinhaEstante();
        res.status(200).json(estante);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar estante", erro: error.message });
    }
});

router.post("/:id", (req, res) => {
    try {
        const livro = addLivroEstante(Number(req.params.id));
        res.status(201).json({ mensagem: "Livro adicionado à estante", livro });
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
});

router.delete("/:id", (req, res) => {
    try {
        const livro = removeLivroEstante(Number(req.params.id));
        res.status(200).json({ mensagem: "Livro removido da estante", livro });
    } catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
});

module.exports = router;
