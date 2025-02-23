const fs = require("fs");
const caminhoEstante = "minhaEstante.json";
const caminhoLivros = "livros.json";

function getMinhaEstante() {
    try {
        if (!fs.existsSync(caminhoEstante)) {
            console.warn("⚠️ Arquivo minhaEstante.json não encontrado. Criando um novo.");
            fs.writeFileSync(caminhoEstante, "[]"); 
            return [];
        }

        const data = fs.readFileSync(caminhoEstante, "utf-8").trim();
        return data ? JSON.parse(data) : []; 
    } catch (error) {
        console.error("❌ Erro ao ler minhaEstante.json:", error);
        return [];
    }
}

function addLivroEstante(id) {
    try {
        const livros = JSON.parse(fs.readFileSync(caminhoLivros, "utf-8"));
        const estante = getMinhaEstante();

        const livroEncontrado = livros.find(livro => livro.id === id);

        if (!livroEncontrado) {
            throw new Error(`Livro com ID ${id} não encontrado.`);
        }

        if (estante.some(livro => livro.id === id)) {
            throw new Error(`Livro com ID ${id} já está na estante.`);
        }

        const novaEstante = [...estante, livroEncontrado];
        fs.writeFileSync(caminhoEstante, JSON.stringify(novaEstante, null, 2));

        console.log(`✅ Livro ${livroEncontrado.nome} (ID: ${id}) adicionado à estante.`);
        return livroEncontrado;
    } catch (error) {
        console.error("❌ Erro ao adicionar livro à estante:", error);
        throw new Error(error.message);
    }
}

function removeLivroEstante(id) {
    try {
        const estante = getMinhaEstante();
        const livroRemovido = estante.find(livro => livro.id === id);

        if (!livroRemovido) {
            throw new Error(`Livro com ID ${id} não está na estante.`);
        }

        const novaEstante = estante.filter(livro => livro.id !== id);
        fs.writeFileSync(caminhoEstante, JSON.stringify(novaEstante, null, 2));

        console.log(`🗑️ Livro ${livroRemovido.nome} (ID: ${id}) removido da estante.`);
        return livroRemovido;
    } catch (error) {
        console.error("❌ Erro ao remover livro da estante:", error);
        throw new Error(error.message);
    }
}

module.exports = {
    getMinhaEstante,
    addLivroEstante,
    removeLivroEstante
};
