// router/editora_router.js
const express = require("express");
const router = express.Router();

const editoraController = require("../controller/editora_controller");
//const authMiddleware = require("../middleware/auth_middleware");

//router.use(authMiddleware.verificarAcesso);

router.route('/')
    .post(editoraController.inserir)
    .get(editoraController.listar);

router.route('/:id')
    .get(editoraController.buscarPorId)
    .put(editoraController.atualizar)
    .delete(editoraController.deletar);

module.exports = router;