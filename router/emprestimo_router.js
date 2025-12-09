// router/emprestimo_router.js
const express = require('express');
const router = express.Router();

const emprestimoController = require("../controller/emprestimo_controller");
const { verificarAcesso } = require("../middleware/auth_middleware");
router.use(verificarAcesso);

router.post('/retirada', emprestimoController.retirarLivros); 

router.post('/devolucao', emprestimoController.devolverLivros);

router.get('/', emprestimoController.listar); 

module.exports = router;