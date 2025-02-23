const { Router } = require("express");
const { getTodosLivros, insereLivro } = require("../servicos/livro");
const multer = require("multer");
const path = require("path");

const router = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
    try {
        const livros = getTodosLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livros", detalhe: error.message });
    }
});

router.post("/", upload.single("imagem"), (req, res) => {
    try {
        const { nome, descricao } = req.body;
        const imagem = req.file ? req.file.filename : "default.jpg";

        const novoLivro = { nome, descricao, imagem };
        const livroAdicionado = insereLivro(novoLivro);

        res.status(201).json({ mensagem: "Livro adicionado com sucesso", livro: livroAdicionado });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao adicionar livro", detalhe: error.message });
    }
});

module.exports = router;
