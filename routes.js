const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/tiposclientes', controller.listTiposClientes);
router.get('/tiposclientes/:id', controller.getTipoClienteById);

router.post('/tiposclientes', controller.validateTipoCliente, controller.createTipoCliente);
router.put('/tiposclientes/:id', controller.validateTipoCliente, controller.updateTipoCliente);
router.delete('/tiposclientes/:id', controller.deleteTipoCliente);

router.post('/clientes', controller.createCliente);

router.post('/emprestimos', controller.realizarEmprestimo);
router.post('/devolucoes', controller.realizarDevolucao);

module.exports = router;