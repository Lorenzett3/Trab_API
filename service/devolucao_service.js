// service/token_service.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredissimo";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";

const criarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

const verificarToken = (token) => {
  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    return decodedPayload;
  } catch (error) {
    throw { id: 403, msg: "Token inválido ou expirado." };
  }
};

module.exports = {
  criarToken,
  verificarToken,
};
