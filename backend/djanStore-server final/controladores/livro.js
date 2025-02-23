const {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletarLivroPorId
} = require("../servicos/livro");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage });

function getLivros(req, res) {
    try {
        const livros = getTodosLivros();

        const livrosComImagens = livros.map((livro) => ({
            ...livro,
            imagem: livro.imagem ? `http://localhost:8000/uploads/${livro.imagem}` : null
        }));

        res.json(livrosComImagens);
    } catch (error) {
        res.status(500).send({ erro: "Erro ao buscar livros", detalhe: error.message });
    }
}

function getLivro(req, res) {
    try {
        const id = req.params.id;
        if (id && Number(id)) {
            const livro = getLivroPorId(id);
            if (!livro) {
                return res.status(404).send({ erro: "Livro não encontrado" });
            }

            livro.imagem = livro.imagem ? `http://localhost:8000/uploads/${livro.imagem}` : null;
            res.json(livro);
        } else {
            res.status(422).send({ erro: "ID inválido" });
        }
    } catch (error) {
        res.status(500).send({ erro: "Erro ao buscar livro", detalhe: error.message });
    }
}

function postLivro(req, res) {
    try {
        const livroNovo = req.body;
        
        if (!livroNovo.nome) {
            return res.status(422).send({ erro: "O campo nome é obrigatório" });
        }

        if (req.file) {
            livroNovo.imagem = req.file.filename;
        }

        insereLivro(livroNovo);
        res.status(201).send({ mensagem: "Livro inserido com sucesso" });
    } catch (error) {
        res.status(500).send({ erro: "Erro ao inserir livro", detalhe: error.message });
    }
}

function patchLivro(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;

        if (!id || !Number(id)) {
            return res.status(422).send({ erro: "ID inválido" });
        }

        modificaLivro(body, id);
        res.send({ mensagem: "Item modificado com sucesso" });
    } catch (error) {
        res.status(500).send({ erro: "Erro ao modificar livro", detalhe: error.message });
    }
}

function deleteLivro(req, res) {
    try {
        const id = req.params.id;
        if (!id || !Number(id)) {
            return res.status(422).send({ erro: "ID inválido" });
        }

        deletarLivroPorId(id);
        res.send({ mensagem: "Livro deletado com sucesso" });
    } catch (error) {
        res.status(500).send({ erro: "Erro ao deletar livro", detalhe: error.message });
    }
}

module.exports = {
    getLivros,
    getLivro,
    postLivro: [upload.single("imagem"), postLivro], 
    patchLivro,
    deleteLivro
};
