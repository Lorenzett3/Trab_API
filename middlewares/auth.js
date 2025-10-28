const jwt = require('jsonwebtoken');

const SECRET_KEY = 'chave_secreta_para_biblioteca_aluno3';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acesso negado. Token no formato Bearer é obrigatório.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
    }
};

module.exports = {
    SECRET_KEY,
    verifyToken
};