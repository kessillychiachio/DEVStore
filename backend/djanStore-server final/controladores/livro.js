const {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletarLivroPorId
} = require("../servicos/livro");

const path = require("path");
const multer = require("multer");

const BASE_URL = "http://localhost:8000"; 

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const formatLivro = (livro) => ({
    ...livro,
    imagem: livro.imagem ? `${BASE_URL}/uploads/${livro.imagem}` : `${BASE_URL}/uploads/default.jpg`
});

const getLivros = (req, res) => {
    try {
        const livros = getTodosLivros().map(formatLivro);
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livros", detalhe: error.message });
    }
};

const getLivro = (req, res) => {
    try {
        const livro = getLivroPorId(req.params.id);
        if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

        res.json(formatLivro(livro));
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livro", detalhe: error.message });
    }
};

const postLivro = (req, res) => {
    try {
        const livroNovo = { ...req.body, imagem: req.file?.filename || "default.jpg" };
        insereLivro(livroNovo);
        res.status(201).json({ mensagem: "Livro inserido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao inserir livro", detalhe: error.message });
    }
};

const patchLivro = (req, res) => {
    try {
        modificaLivro(req.body, req.params.id);
        res.json({ mensagem: "Livro modificado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao modificar livro", detalhe: error.message });
    }
};

const deleteLivro = (req, res) => {
    try {
        deletarLivroPorId(req.params.id);
        res.json({ mensagem: "Livro deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar livro", detalhe: error.message });
    }
};

module.exports = {
    getLivros,
    getLivro,
    postLivro: [upload.single("imagem"), postLivro], 
    patchLivro,
    deleteLivro
};
