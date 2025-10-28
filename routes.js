const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const authController = require('./authController');
const { verifyToken } = require('./middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/tiposclientes', controller.listTiposClientes);
router.get('/tiposclientes/:id', controller.getTipoClienteById);

router.post('/tiposclientes', verifyToken, controller.validateTipoCliente, controller.createTipoCliente);
router.put('/tiposclientes/:id', verifyToken, controller.validateTipoCliente, controller.updateTipoCliente);
router.delete('/tiposclientes/:id', verifyToken, controller.deleteTipoCliente);

router.post('/clientes', verifyToken, controller.createCliente);

router.post('/emprestimos', verifyToken, controller.realizarEmprestimo);
router.post('/devolucoes', verifyToken, controller.realizarDevolucao);

module.exports = router;