// service/autor_service.js
const autorRepository = require("../repository/autores_repository");

async function listar() {
  return await autorRepository.listar();
}

async function inserir(autor) {
  if (autor && autor.nome && autor.pais) {
    return await autorRepository.inserir(autor);
  } else {
    throw { id: 400, msg: "Autor sem nome ou país de origem." };
  }
}

async function buscarPorId(id) {
  let autor = await autorRepository.buscarPorId(id);
  if (autor) {
    return autor;
  } else {
    throw { id: 404, msg: "Autor não encontrado!" };
  }
}

async function atualizar(id, autor) {
  if (autor && autor.nome && autor.pais) {
    const autorAtualizado = await autorRepository.atualizar(id, autor);
    if (autorAtualizado) {
      return autorAtualizado;
    } else {
      throw { id: 404, msg: "Autor não encontrado para atualizar" };
    }
  } else {
    throw { id: 400, msg: "Dados de autor incorretos." };
  }
}

async function deletar(id) {
  let autor = await autorRepository.deletar(id);
  if (autor) {
    return autor;
  } else {
    throw { id: 404, msg: "Autor não encontrado para deletar!" };
  }
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
};
