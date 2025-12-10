// router/emprestimo_router.js
const express = require('express');
const router = express.Router();

const emprestimoController = require("../controller/emprestimo_controller");
const authMiddleware = require("../middleware/auth_middleware"); 

router.use(authMiddleware);

// POST /api/emprestimos/retirada 
router.post('/retirada', emprestimoController.retirarLivros); 

// POST /api/emprestimos/devolucao 
router.post('/devolucao', emprestimoController.devolverLivros);

// GET /api/emprestimos 
router.get('/', emprestimoController.listar); 

module.exports = router;