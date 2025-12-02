const livroService = require('../service/livro_service')

async function listar(req, res) {
    res.json(await livroService.listar());
}

async function inserir (req, res) {
    let livro = req.body;
    try { 
        livro = await livroService.inserir(livro);
        res.status(201).json(livro);
    }
    catch(err) {
        res.status(err.id).json(err);
    }
}

async function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(await livroService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let livro = req.body;
    try{
        res.json(await livroService.atualizar(id, livro));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

async function deletar (req, res) {
    const id = +req.params.id;
    try {
        res.json(await livroService.deletar(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    listar, 
    inserir, 
    buscarPorId, 
    atualizar, 
    deletar
}