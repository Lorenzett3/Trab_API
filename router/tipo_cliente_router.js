// router/tipo_cliente_router.js
const express = require("express");
const router = express.Router();

const tipoClienteController = require("../controller/tipo_cliente_controller");
//const authMiddleware = require("../middleware/auth_middleware");

//router.use(authMiddleware.verificarAcesso);

router.route('/')
    .post(tipoClienteController.inserir)
    .get(tipoClienteController.listar);

router.route('/:id')
    .get(tipoClienteController.buscarPorId);

module.exports = router;