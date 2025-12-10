// service/token_service.js

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "segredissimo";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "1h";

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
};

const verifyToken = (token) => {
  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    return decodedPayload;
  } catch (error) {
    throw { id: 401, msg: "Token inválido ou expirado." }; 
  }
};

module.exports = {
  criarToken: generateToken, 
  verificarToken: verifyToken, 
};