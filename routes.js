// routes.js

const express = require('express');
const router = express.Router();
const controller = require('./controllers');
// const { verifyToken } = require('./middlewares/auth'); // Para o Conceito A

// --- CRUD SIMPLES: TIPO DE CLIENTE ---
router.get('/tiposclientes', controller.listTiposClientes);
router.get('/tiposclientes/:id', controller.getTipoClienteById);
// Utiliza o middleware de validação (Conceito B)
router.post('/tiposclientes', controller.validateTipoCliente, controller.createTipoCliente);

// --- CRUD COM RELACIONAMENTO: CLIENTE ---
router.post('/clientes', controller.createCliente);

// --- FUNCIONALIDADES DE NEGÓCIO ---
// Estas rotas seriam protegidas (ex: router.post('/emprestimos', verifyToken, controller.realizarEmprestimo);)
router.post('/emprestimos', controller.realizarEmprestimo);
router.post('/devolucoes', controller.realizarDevolucao);

// --- AUTENTICAÇÃO (Ex: /login, /register, que você fará separadamente para o Conceito A) ---

module.exports = router;