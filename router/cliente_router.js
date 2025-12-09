// router/cliente_router.js
const express = require("express");
const router = express.Router();

const clienteController = require("../controller/cliente_controller");
const { verificarAcesso } = require("../middleware/auth_middleware");
router.use(verificarAcesso);

router.route('/')
    .post(clienteController.inserir)
    .get(clienteController.listar);

router.route('/:matricula') 
    .get(clienteController.buscarPorMatricula)
    .put(clienteController.atualizar)
    .delete(clienteController.deletar);

module.exports = router;