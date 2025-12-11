// service/usuario_service.js
const usuarioRepository = require("../repository/usuario_repository");
const tokenService = require("./token_service");

async function listar() {
  return await usuarioRepository.listar();
}

async function inserir(usuario) {

  if (usuario && usuario.nome && usuario.email && usuario.senha) {
    return await usuarioRepository.cadastrarUsuario(usuario);
  } else {
    throw { id: 400, msg: "Usuario com dados incorretos (nome, email, senha são obrigatórios)."};
  }
}

async function buscarPorId(id) {
  await usuarioRepository.buscarPorId(id);
  if (usuario) {
    return usuario;
  } else {
    throw { id: 404, msg: "Este usuario não encontrado!" };
  }
}

async function buscarPorEmail(email) {
  let usuario = await usuarioRepository.buscarPorEmail(email);
  if (usuario) {
    return usuario;
  } else {
    throw { id: 404, msg: "Este email não foi encontrado!" };
  }
}

async function verificarLogin(usuario) {
  if (usuario.email) {
    let usuarioCadastrado = await usuarioRepository.buscarPorEmail(usuario.email);
    console.log(usuarioCadastrado)
    if (usuarioCadastrado) {
      if (usuario.senha && usuario.senha == usuarioCadastrado.senha) {
        const token = tokenService.generateToken({id: usuarioCadastrado.id, email: usuarioCadastrado.email,});
        return { token: token };
      }
    }
  }
  throw { id: 401, msg: "Email ou senha invalidos" };
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  buscarPorEmail,
  verificarLogin,
};
