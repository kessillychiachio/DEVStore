const express = require("express");
const cors = require("cors");
const app = require("./app"); 

const PORT = process.env.PORT || 8000;

const server = express();

server.use(cors()); 
server.use(express.json()); 


server.use(app);


server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
