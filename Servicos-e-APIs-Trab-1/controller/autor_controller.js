const autorService = require('../service/autor_service')

async function listar(req, res) {
    res.json(await autorService.listar());
}

async function inserir (req, res) {
    let autor = req.body;
    try { 
        autor = await autorService.inserir(autor);
        res.status(201).json(autor);
    }
    catch(err) {
        res.status(err.id).json(err);
    }
}

async function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(await autorService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let autor = req.body;
    try{
        res.json(await autorService.atualizar(id, autor));
    } catch(err) {
        res.status(err.id).json(err);
    }
}

async function deletar (req, res) {
    const id = +req.params.id;
    try {
        res.json(await autorService.deletar(id));
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