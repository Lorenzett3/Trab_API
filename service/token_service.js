const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'segredissimo';
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h'; // 1 hora de validade

/**
 * Cria e assina um JSON Web Token (JWT).
 * @param {object} payload - Os dados a serem incluídos no token (ex: { id: 123, role: 'admin' }).
 * @returns {string} O token JWT assinado.
 */
const generateToken = (payload) => {
  // 1. O 'sign' cria a string do token.
  return jwt.sign(
    payload,          // 1º argumento: O 'payload' (dados do usuário)
    JWT_SECRET,       // 2º argumento: A chave secreta
    { expiresIn: TOKEN_EXPIRATION } // 3º argumento: Opções (expiração)
  );
};

/**
 * Verifica e decodifica um JSON Web Token (JWT).
 * @param {string} token - O token JWT enviado pelo cliente.
 * @returns {object} O payload decodificado se for válido.
 * @throws {Error} Se o token for inválido, expirado ou não assinado corretamente.
 */
const verifyToken = (token) => {
  try {
    // 1. O 'verify' garante que o token é válido e não expirou
    const decodedPayload = jwt.verify(token, JWT_SECRET);
    return decodedPayload;
  } catch (error) {
    // Captura erros comuns do JWT (ex: TokenExpiredError, JsonWebTokenError)
    throw new Error('Token inválido ou expirado.');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};