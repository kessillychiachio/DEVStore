const fs = require("fs");
const caminhoFavoritos = "favoritos.json";
const caminhoLivros = "livros.json";

function getTodosFavoritos() {
    try {
        if (!fs.existsSync(caminhoFavoritos)) {
            fs.writeFileSync(caminhoFavoritos, "[]");
            return [];
        }
        const data = fs.readFileSync(caminhoFavoritos, "utf-8").trim();
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("❌ Erro ao ler favoritos.json:", error);
        return [];
    }
}

function insereFavorito(id) {
    try {
        if (!fs.existsSync(caminhoLivros)) {
            console.error("❌ Arquivo livros.json não encontrado.");
            return;
        }

        const livros = JSON.parse(fs.readFileSync(caminhoLivros, "utf-8"));
        const favoritos = getTodosFavoritos();

        const livroInserido = livros.find(livro => livro.id === Number(id));

        if (!livroInserido) {
            console.warn(`⚠️ Livro com ID ${id} não encontrado.`);
            return;
        }

        if (favoritos.some(livro => livro.id === Number(id))) {
            console.warn(`⚠️ Livro com ID ${id} já está nos favoritos.`);
            return;
        }

        favoritos.push(livroInserido);
        fs.writeFileSync(caminhoFavoritos, JSON.stringify(favoritos, null, 2));
        console.log(`✅ Livro ${livroInserido.nome} (ID: ${id}) adicionado aos favoritos.`);
    } catch (error) {
        console.error("❌ Erro ao inserir favorito:", error);
    }
}

function deletarFavoritoPorId(id) {
    try {
        const favoritos = getTodosFavoritos();
        const novaLista = favoritos.filter(livro => livro.id !== Number(id));
        fs.writeFileSync(caminhoFavoritos, JSON.stringify(novaLista, null, 2));
        console.log(`🗑️ Livro ID: ${id} removido dos favoritos.`);
    } catch (error) {
        console.error("❌ Erro ao deletar favorito:", error);
    }
}

module.exports = {
    getTodosFavoritos,
    insereFavorito,
    deletarFavoritoPorId
};
