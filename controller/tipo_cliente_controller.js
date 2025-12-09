// controller/tipo_cliente_controller.js
const tipoClienteService = require('../service/tipo_cliente_service');

async function listar(req, res) {
    try {
        const tipos = await tipoClienteService.listar();
        res.json(tipos);
    } catch (err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao listar tipos de cliente.' });
    }
}

async function inserir(req, res) {
    let tipo = req.body;
    try {
        tipo = await tipoClienteService.inserir(tipo);
        res.status(201).json(tipo);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao inserir tipo de cliente.' });
    }
}

async function buscarPorId(req, res) {
    const id = req.params.id;
    try {
        const tipo = await tipoClienteService.buscarPorId(id);
        res.json(tipo);
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Tipo de Cliente não encontrado.' });
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
}