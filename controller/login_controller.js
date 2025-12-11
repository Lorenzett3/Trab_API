const usuarioService = require("../service/usuario_service")

async function realizarCadastro(req, res) {
    let usuario = req.body;

    try {
        let tipo = await usuarioService.inserir(usuario);
        res.status(201).json(tipo);
    }
    catch (err) {
        console.log("error", err)
        res.status(err.id).json(err);
    }
}

async function realizarLogin(req, res) {
    let usuario = req.body;

    try {
        let mensagem = await usuarioService.verificarLogin(usuario);
        res.status(201).json(mensagem);
    }
    catch (err) {
        console.log("error", err)
        res.status(err.id).json(err);
    }
}

module.exports = {
    realizarCadastro, 
    realizarLogin
}