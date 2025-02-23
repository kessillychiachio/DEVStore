const fs = require("fs");
const caminhoEstante = "estante.json";
const caminhoLivros = "livros.json";

function getEstante(req, res) {
    try {
        if (!fs.existsSync(caminhoEstante)) {
            fs.writeFileSync(caminhoEstante, "[]");
        }
        const data = fs.readFileSync(caminhoEstante, "utf-8");
        res.status(200).json(data ? JSON.parse(data) : []);
    } catch (error) {
        console.error("❌ Erro ao buscar estante:", error);
        res.status(500).json({ mensagem: "Erro ao buscar estante", erro: error.message });
    }
}

function addLivroEstante(req, res) {
    try {
        const id = Number(req.params.id);
        const livros = JSON.parse(fs.readFileSync(caminhoLivros, "utf-8"));
        const estante = JSON.parse(fs.readFileSync(caminhoEstante, "utf-8"));

        const livro = livros.find(l => l.id === id);
        if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });

        if (estante.some(l => l.id === id)) {
            return res.status(400).json({ mensagem: "Livro já está na estante" });
        }

        estante.push(livro);
        fs.writeFileSync(caminhoEstante, JSON.stringify(estante, null, 2));
        res.status(201).json({ mensagem: "Livro adicionado à estante", livro });
    } catch (error) {
        console.error("❌ Erro ao adicionar livro à estante:", error);
        res.status(500).json({ mensagem: "Erro ao adicionar livro", erro: error.message });
    }
}

function removeLivroEstante(req, res) {
    try {
        const id = Number(req.params.id);
        let estante = JSON.parse(fs.readFileSync(caminhoEstante, "utf-8"));

        if (!estante.some(l => l.id === id)) {
            return res.status(404).json({ mensagem: "Livro não encontrado na estante" });
        }

        estante = estante.filter(l => l.id !== id);
        fs.writeFileSync(caminhoEstante, JSON.stringify(estante, null, 2));
        res.status(200).json({ mensagem: "Livro removido da estante" });
    } catch (error) {
        console.error("❌ Erro ao remover livro da estante:", error);
        res.status(500).json({ mensagem: "Erro ao remover livro", erro: error.message });
    }
}

module.exports = { getEstante, addLivroEstante, removeLivroEstante };
