const fs = require("fs");
const caminhoEstante = "estante.json";

function getEstante() {
    if (!fs.existsSync(caminhoEstante)) {
        fs.writeFileSync(caminhoEstante, "[]");
    }
    return JSON.parse(fs.readFileSync(caminhoEstante, "utf-8"));
}

function adicionarLivroEstante(livro) {
    const estante = getEstante();
    
    if (estante.some((l) => l.id === livro.id)) {
        return;
    }

    estante.push(livro);
    fs.writeFileSync(caminhoEstante, JSON.stringify(estante, null, 2));
}

function removerLivroEstante(id) {
    const estante = getEstante();
    const novaEstante = estante.filter((livro) => livro.id !== id);
    fs.writeFileSync(caminhoEstante, JSON.stringify(novaEstante, null, 2));
}

module.exports = { getEstante, adicionarLivroEstante, removerLivroEstante };
