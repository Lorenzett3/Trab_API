// controller/autor_controller.js
const autorService = require('../service/autor_service');

async function listar(req, res) {
    try {
        const autores = await autorService.listar();
        res.json(autores);
    } catch (err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao listar autores.' });
    }
}

async function inserir (req, res) {
    let autor = req.body;
    try { 
        autor = await autorService.inserir(autor);
        res.status(201).json(autor);
    }
    catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Dados de autor incorretos.' });
    }
}

async function buscarPorId(req, res) { 
    const id = +req.params.id;
    try {
        res.json(await autorService.buscarPorId(id));
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Autor não encontrado.' });
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let autor = req.body;
    try{
        res.json(await autorService.atualizar(id, autor));
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao atualizar autor.' });
    }
}

async function deletar (req, res) {
    const id = +req.params.id;
    try {
        await autorService.deletar(id);
        res.status(204).send();
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Autor não encontrado para deletar.' });
    }
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    atualizar, 
    deletar
}