// controller/login.controller.js
const usuarioService = require("../service/usuario_service");

async function realizarLogin(req, res) {
    let usuario = req.body;

    try {
        let token = await usuarioService.verificarLogin(usuario);
        res.status(200).json(token); 
    }
    catch (err) {
        res.status(err.id || 401).json({ message: err.msg || "Email ou senha invalidos" });
    }
}

module.exports = { 
    realizarLogin
}