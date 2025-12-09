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
    throw new Error("Token inválido ou expirado.");
  }
};

module.exports = {
  generateToken,
  verificarToken: verifyToken, 
};