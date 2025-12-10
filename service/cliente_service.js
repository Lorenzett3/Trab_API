// service/cliente_service.js
const clienteRepository = require("../repository/cliente_repository");
const tipoClienteRepository = require("../repository/tipo_cliente_repository");

async function listar() {
    return await clienteRepository.listar();
}

async function inserir(cliente) {
    if (!cliente || !cliente.matricula || !cliente.name || !cliente.client_type_id || !cliente.email) {
        throw { id: 400, msg: "Cliente com dados incorretos (Matrícula, Nome, Tipo ID e Email são obrigatórios)." };
    }

    const existingMatricula = await clienteRepository.buscarPorMatricula(cliente.matricula);
    if (existingMatricula) {
        throw { id: 400, msg: "Matrícula já cadastrada." };
    }

    const clientType = await tipoClienteRepository.buscarPorId(cliente.client_type_id);
    if (!clientType) {
        throw { id: 400, msg: `Tipo de Cliente inválido.` };
    }

    return await clienteRepository.inserir(cliente);
}

async function buscarPorMatricula(matricula) {
    let cliente = await clienteRepository.buscarPorMatricula(matricula);
    if (cliente) return cliente;

    throw { id: 404, msg: "Cliente não encontrado!" };
}

async function atualizar(matricula, cliente) {
    if (!cliente || !cliente.name || !cliente.email) {
        throw { id: 400, msg: "Nome e e-mail são obrigatórios para atualização." };
    }

    const updated = await clienteRepository.atualizar(matricula, cliente);
    if (updated) return updated;

    throw { id: 404, msg: "Cliente não encontrado para atualizar." };
}

async function deletar(matricula) {
    let cliente = await clienteRepository.deletar(matricula);
    if (cliente) return cliente;

    throw { id: 404, msg: "Cliente não encontrado para deletar!" };
}

module.exports = {
    listar,
    inserir,
    buscarPorMatricula,
    atualizar,
    deletar
}