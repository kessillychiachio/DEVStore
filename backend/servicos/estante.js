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

    if (estante.some(l => l.id === livro.id)) {
        console.warn(`⚠️ O livro "${livro.nome}" já está na estante.`);
        return;
    }

    estante.push(livro);
    fs.writeFileSync(caminhoEstante, JSON.stringify(estante, null, 2));
    console.log(`✅ Livro "${livro.nome}" adicionado à estante.`);
}

function removerLivroEstante(id) {
    let estante = getEstante();
    estante = estante.filter(livro => livro.id !== id);
    fs.writeFileSync(caminhoEstante, JSON.stringify(estante, null, 2));
    console.log(`🗑️ Livro removido da estante.`);
}

module.exports = { getEstante, adicionarLivroEstante, removerLivroEstante };
