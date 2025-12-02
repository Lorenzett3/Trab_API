const autorRepository = require("../repositoryBD/autores_repository_bd");

async function listar() {
    return await autorRepository.listar();
}

async function inserir(autor) {
    //Validar se editora tem nome e preço
    if(autor && autor.nome && editor.pais){
        return await autorRepository.inserir(autor);
    }
    else {
        //Erro
        throw { id: 400, msg: "Editor sem dados corretos"};
    }
}

async function buscarPorId(id) {
    let autor = await autorRepository.buscarPorId(id);
    if(autor) {
        return autor;
    }
    else {
        throw { id: 404, msg: "Autor não encontrado!"};
    }
}
async function atualizar(id, autor) {
    if(autor && autor.nome && autor.pais) {
        const autorAtualizado = await autorRepository.atualizar(id, autor);
        if(autorAtualizado) {
            return autorAtualizado;
        }        
        else {
            throw {id:404, msg: "Editora não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Editora sem dados corretos"};
    }
}

async function deletar(id) {
    let autor = await autorRepository.deletar(id);
    if(autor) {
        return autor;
    }
    else {
        throw { id: 404, msg: "Editora não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}