const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(8000, () => console.log("🚀 Servidor rodando em http://localhost:8000"));
