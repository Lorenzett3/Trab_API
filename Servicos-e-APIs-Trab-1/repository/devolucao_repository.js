const emprestimoRepository = require("../repository/emprestimo_repository");

let listaDevolucao = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaDevolucao);
}

function inserir(devolucao) {
    devolucao.id = autoIncrement++;
    listaDevolucao.push(devolucao);
    return Promise.resolve(devolucao);
}

function buscarDevolucaoPorId(id) {
    return listaDevolucao.findIndex((devolucao) => devolucao.id === id);
}


function atualizar(id, devolucao) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        devolucao.id = id; 
        listaDevolucao[indice] = devolucao;
        return Promise.resolve(listaDevolucao[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceDevolucao = buscarIndicePorId(id);
    if(indiceDevolucao >= 0) {
        let devolucaoRemovida = listaDevolucao.splice(indiceDevolucao, 1)[0];
        return devolucaoRemovida;
    }
    return Promise.resolve(undefined);

}

module.exports = {
  listar,
  inserir,
  buscarDevolucaoPorId,
  atualizar,
  deletar,
}