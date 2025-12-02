const express = require('express');
const router = express.Router();

const emprestimoController = require("../controller/emprestimo_controller");

router.post('/emprestimos', emprestimoController.inserir);

module.exports = router;