// controller/cliente_controller.js
const clienteService = require('../service/cliente_service');

async function listar(req, res) {
    try {
        const clientes = await clienteService.listar();
        res.json(clientes);
    } catch (err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao listar clientes.' });
    }
}

async function inserir(req, res) {
    let cliente = req.body;
    try {
        cliente = await clienteService.inserir(cliente);
        res.status(201).json(cliente);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao inserir cliente.' });
    }
}

async function buscarPorMatricula(req, res) {
    const matricula = req.params.matricula;
    try {
        const cliente = await clienteService.buscarPorMatricula(matricula);
        res.json(cliente);
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Cliente não encontrado.' });
    }
}

async function atualizar(req, res) {
    const matricula = req.params.matricula;
    let cliente = req.body;
    try{
        const clienteAtualizado = await clienteService.atualizar(matricula, cliente);
        res.json(clienteAtualizado);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao atualizar cliente.' });
    }
}

async function deletar (req, res) {
    const matricula = req.params.matricula;
    try {
        await clienteService.deletar(matricula);
        res.status(204).send();
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Cliente não encontrado para deletar.' });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorMatricula,
    atualizar,
    deletar
}