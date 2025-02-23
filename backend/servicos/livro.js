const fs = require("fs");
const caminhoLivros = "livros.json";

function getTodosLivros() {
    if (!fs.existsSync(caminhoLivros)) {
        fs.writeFileSync(caminhoLivros, "[]");
    }
    return JSON.parse(fs.readFileSync(caminhoLivros, "utf-8"));
}

function getLivroPorId(id) {
    const livros = getTodosLivros();
    return livros.find((livro) => livro.id.toString() === id.toString()) || null; 
}

function insereLivro(novoLivro) {
    const livros = getTodosLivros();
    novoLivro.id = Date.now().toString();
    livros.push(novoLivro);
    fs.writeFileSync(caminhoLivros, JSON.stringify(livros, null, 2));
    return novoLivro;
}

module.exports = { getTodosLivros, getLivroPorId, insereLivro };
