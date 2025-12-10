// router/livro_router.js
const express = require("express");
const router = express.Router();

const livroController = require("../controller/livro_controller");
const authMiddleware = require("../middleware/auth_middleware");

router.use(authMiddleware);

router.get('/', livroController.listar);
router.post('/', livroController.inserir);
router.get('/:id', livroController.buscarPorId);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

module.exports = router;