// router/usuario_router.js
const express = require('express')
const router = express.Router();

const usuarioController = require('../controller/usuario_controller');

const { verificarAcesso } = require("../middleware/auth_middleware");
router.use(verificarAcesso); 

router.get('/', usuarioController.listar)
router.post('/', usuarioController.inserir) 
router.get('/:id', usuarioController.buscarPorId)

module.exports = router;