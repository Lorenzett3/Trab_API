// router/editora_router.js
const express = require("express");
const router = express.Router();

const editoraController = require("../controller/editora_controller");
const { verificarAcesso } = require("../middleware/auth_middleware");
router.use(verificarAcesso);

router.route('/')
    .post(editoraController.inserir)
    .get(editoraController.listar);

router.route('/:id')
    .get(editoraController.buscarPorId)
    .put(editoraController.atualizar)
    .delete(editoraController.deletar);

module.exports = router;