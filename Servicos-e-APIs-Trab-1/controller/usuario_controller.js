const usuarioService = require("../service/usuario_service")

async function listar(req, res) {
    const email = (req.query && req.query.email) 
        ? req.query.email 
        :undefined;

    if(!email) {    
        res.json(await usuarioService.listar());        
    }

    else {
        try {
                res.json(await usuarioService.buscarPorEmail(email));
            } catch(err) {
                res.status(err.id).json(err);
            }
    }
}

async function inserir (req, res) {
    let usuario = req.body;
    try { 
        usuario = await usuarioService.inserir(usuario);
        res.status(201).json(usuario);
    }
    catch(err) {
        console.log(err);
        res.status(err.id).json(err);
    }
}

async function buscarPorId(req, res) {    
    const id = +req.params.id;
    try {
        res.json(await usuarioService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
}