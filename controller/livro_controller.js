// controller/livro.controller.js
const livroService = require('../service/livro_service');

async function listar(req, res) {
    try {
        res.json(await livroService.listar());
    } catch (err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao listar livros.' });
    }
}

async function inserir (req, res) {
    let livro = req.body;
    try { 
        livro = await livroService.inserir(livro);
        res.status(201).json(livro);
    }
    catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Dados de livro incorretos.' });
    }
}

async function buscarPorId(req, res) { 
    const id = +req.params.id;
    try {
        res.json(await livroService.buscarPorId(id));
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Livro não encontrado.' });
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let livro = req.body;
    try{
        res.json(await livroService.atualizar(id, livro));
    } catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Erro ao atualizar livro.' });
    }
}

async function deletar (req, res) {
    const id = +req.params.id;
    try {
        await livroService.deletar(id);
        res.status(204).send();
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Livro não encontrado para deletar.' });
    }
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    atualizar, 
    deletar
}