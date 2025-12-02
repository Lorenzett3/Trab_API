const express = require("express");
const router = express.Router();

const autorController = require("../controller/autor_controller")

//endpoint: /api/produtos
router.get('/', autorController.listar);
router.post('/', autorController.inserir);
router.get('/:id', autorController.buscarPorId);
router.put('/:id', autorController.atualizar);
router.delete('/:id', autorController.deletar);

module.exports = router;