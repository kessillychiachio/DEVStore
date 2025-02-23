const express = require("express");
const cors = require("cors");

const rotaLivro = require("./rotas/livro");
const rotaFavorito = require("./rotas/favoritos");
const rotaEstante = require("./rotas/estante");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/livros", rotaLivro);
app.use("/favoritos", rotaFavorito);
app.use("/estante", rotaEstante);

module.exports = app;
