const livroRepository = require("../repositoryBD/livro_repository_bd")

async function listar() {
    return await livroRepository.listar();
}

async function inserir(livro) {
    //Validar se livro tem nome e preço
    if(livro && livro.nome && livro.ISBN && livro.autor && livro.editora && livro.numPaginas){
        return await livroRepository.inserir(livro);
    }
    else {
        //Erro
        throw { id: 400, msg: "Livro sem dados corretos"};
    }


}

async function buscarPorId(id) {
    let livro = await livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw { id: 404, msg: "Livro não encontrado!"};
    }
}
async function atualizar(id, livro) {
    if(livro && livro.nome && livro.ISBN && livro.autor && livro.editora && livro.numPaginas) {
        const livroAtualizado = await livroRepository.atualizar(id, livro);
        if(livroAtualizado) {
            return livroAtualizado;
        }        
        else {
            throw {id:404, msg: "Livro não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Livro sem dados corretos"};
    }
}

async function deletar(id) {
    let livro = await livroRepository.deletar(id);
    if(livro) {
        return livro;
    }
    else {
        throw { id: 404, msg: "Livro não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}