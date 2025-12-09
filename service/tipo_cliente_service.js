// service/tipo_cliente_service.js
const tipoClienteRepository = require("../repository/tipo_cliente_repository");

async function listar() {
    return await tipoClienteRepository.listar();
}

async function inserir(tipo) {
    if (!tipo || !tipo.name || typeof tipo.maxBooks !== 'number' || tipo.maxBooks <= 0) {
        throw { id: 400, msg: "Tipo de Cliente com dados incorretos (Nome e quantidade máxima válida são obrigatórios)." };
    }

    const existing = await tipoClienteRepository.buscarPorNome(tipo.name);
    if (existing) {
        throw { id: 400, msg: "Nome de Tipo de Cliente já cadastrado." };
    }

    return await tipoClienteRepository.inserir(tipo);
}

async function buscarPorId(id) {
    let tipo = await tipoClienteRepository.buscarPorId(id);
    if (tipo) return tipo;

    throw { id: 404, msg: "Tipo de Cliente não encontrado!" };
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
}