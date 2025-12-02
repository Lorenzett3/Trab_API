const emprestimoRepository = require("../repositoryBD/emprestimo_repository_bd");

async function devolverLivro() {
    if (emprestimo){
        await emprestimoRepository.atualizar(id, emprestimo)
        if ( nome && nomeCliente && dataDevolucao) {
            return await devolucaoRepository.inserir(devolucao)
        }
        else {
            throw { id: 400, msg: "Cliente e datas com dados incorretos."};
        }
    }
    else {
        throw { id: 404, msg: "Empréstimo não encontrado."}
    }
}

module.exports = {
    devolverLivro
}