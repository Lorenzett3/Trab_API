// controller/editora_controller.js
const editoraService = require('../service/editora_service');

async function listar(req, res) {
    try {
        const editoras = await editoraService.listar();
        res.json(editoras);
    } catch (err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao listar editoras.' });
    }
}

async function inserir(req, res) {
    let editora = req.body;
    try {
        editora = await editoraService.inserir(editora);
        res.status(201).json(editora);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Dados de editora incorretos.' });
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const editora = await editoraService.buscarPorId(id);
        res.json(editora);
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Editora não encontrada.' });
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let editora = req.body;
    try{
        const editoraAtualizada = await editoraService.atualizar(id, editora);
        res.json(editoraAtualizada);
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao atualizar editora.' });
    }
}

async function deletar (req, res) {
    const id = +req.params.id;
    try {
        await editoraService.deletar(id);
        res.status(204).send();
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Editora não encontrada para deletar.' });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}