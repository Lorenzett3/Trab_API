// router/usuario_router.js
const express = require('express')
const router = express.Router();

const usuarioController = require('../controller/usuario_controller');
const authMiddleware = require("../middleware/auth_middleware");

router.use(authMiddleware.verificarAcesso);

router.get('/', usuarioController.listar)
router.post('/', usuarioController.inserir)
router.get('/:id', usuarioController.buscarPorId)

module.exports = router;