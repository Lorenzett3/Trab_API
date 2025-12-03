// middleware/auth_middleware.js
const tokenService = require("../service/token_service");

function verificarAcesso (req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ id: 401, msg: "Acesso inválido! Token não fornecido." });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ id: 401, msg: "Acesso inválido! Token mal formatado." });
    }

    try {
        const data = tokenService.verificarToken(token);
        
        req.usuarioId = data.id; 
        
        console.log("Payload do Token", data);
        next(); 
    }
    catch (err) {
        res.status(401).json({ id: 401, msg: err.msg || "Token inválido ou expirado." });
    }
}

module.exports = {
    verificarAcesso
}