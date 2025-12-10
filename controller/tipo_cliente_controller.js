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

async function atualizar(req, res) {
    const id = req.params.id;
    let tipo = req.body;
    try{
        const tipoAtualizado = await tipoClienteService.atualizar(id, tipo);
        res.json(tipoAtualizado);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao atualizar tipo de cliente.' });
    }
}

async function deletar (req, res) {
    const id = req.params.id;
    try {
        await tipoClienteService.deletar(id);
        res.status(204).send(); 
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Tipo de Cliente não encontrado para deletar.' });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}