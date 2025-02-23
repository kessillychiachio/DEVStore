const fs = require("fs");
const caminhoLivros = "livros.json";
const { adicionarLivroEstante } = require("./estante");

function getTodosLivros() {
    if (!fs.existsSync(caminhoLivros)) {
        fs.writeFileSync(caminhoLivros, "[]");
    }
    return JSON.parse(fs.readFileSync(caminhoLivros, "utf-8"));
}

function insereLivro(novoLivro) {
    const livros = getTodosLivros();
    novoLivro.id = Date.now().toString();
    livros.push(novoLivro);
    
    fs.writeFileSync(caminhoLivros, JSON.stringify(livros, null, 2));

    adicionarLivroEstante(novoLivro); 
    
    return novoLivro;
}

module.exports = { getTodosLivros, insereLivro };
