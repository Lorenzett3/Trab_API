// service/editora_service.js
const editoraRepository = require("../repository/editora_repository");

async function listar() {
    return await editoraRepository.listar();
}

async function inserir(editora) {

    if(!editora || !editora.nome || !editora.cidade || !editora.email){
        throw { id: 400, msg: "Editora com dados incorretos (Nome, Cidade, E-mail são obrigatórios)." };
    }

    const existing = await editoraRepository.buscarPorEmail(editora.email);
    if(existing) {
        throw { id: 400, msg: "E-mail de editora já cadastrado." };
    }

    return await editoraRepository.inserir(editora);
}

async function buscarPorId(id) {
    let editora = await editoraRepository.buscarPorId(id);
    if(editora) return editora;

    throw { id: 404, msg: "Editora não encontrada!" };
}

async function atualizar(id, editora) {
    if(editora && editora.nome && editora.cidade && editora.email) {
        const updated = await editoraRepository.atualizar(id, editora);
        if(updated) return updated;

        throw {id:404, msg: "Editora não encontrada para atualizar"};
    } else {
        throw {id:400, msg: "Dados de editora incorretos para atualização"};
    }
}

async function deletar(id) {
    let deleted = await editoraRepository.deletar(id);
    if(deleted) return deleted;

    throw { id: 404, msg: "Editora não encontrada para deletar!" };
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}