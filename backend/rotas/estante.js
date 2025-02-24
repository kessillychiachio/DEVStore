const { Router } = require("express");
const { getEstante, addLivroEstante, removeLivroEstante } = require("../controladores/estante");

const router = Router();

router.get("/", getEstante);
router.post("/", addLivroEstante);
router.delete("/:id", removeLivroEstante);

module.exports = router;
