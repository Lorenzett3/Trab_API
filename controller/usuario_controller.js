// controller/usuario.controller.js
const usuarioService = require("../service/usuario_service");

async function listar(req, res) {
    const email = (req.query && req.query.email) 
        ? req.query.email 
        : undefined;

    try {
        if(email) {  
            res.json(await usuarioService.buscarPorEmail(email));    
        } else {
            res.json(await usuarioService.listar());
        }
    } catch(err) {
        res.status(err.id || 500).json({ message: err.msg || 'Erro ao processar a lista de usuários.' });
    }
}

async function inserir (req, res) {
    let usuario = req.body;
    try { 
        usuario = await usuarioService.inserir(usuario);
        res.status(201).json(usuario);
    }
    catch(err) {
        res.status(err.id || 400).json({ message: err.msg || 'Dados de usuário incorretos.' });
    }
}

async function buscarPorId(req, res) { 
    const id = +req.params.id;
    try {
        res.json(await usuarioService.buscarPorId(id));
    } catch(err) {
        res.status(err.id || 404).json({ message: err.msg || 'Usuário não encontrado.' });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
}