const {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
  } = require("../servicos/livro");
  const path = require("path");
  const multer = require("multer");
  
  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
  const postLivro = (req, res) => {
    try {
      const livroNovo = { ...req.body, imagem: req.file?.filename || "default.jpg" };
      insereLivro(livroNovo);
      res.status(201).json({ mensagem: "Livro inserido com sucesso" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao inserir livro", detalhe: error.message });
    }
  };
  
  module.exports = {
    postLivro: [upload.single("imagem"), postLivro],
  };
  