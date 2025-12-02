const emprestimoRepository = require("../repository/devolucao_repository");

let listaEmprestimo = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaEmprestimo);
}

function inserir(emprestimo) {
    emprestimo.id = autoIncrement++;
    listaEmprestimo.push(emprestimo);
    return Promise.resolve(emprestimo);
}

function buscarEmprestimoPorId(id) {
    return listaEmprestimo.findIndex((emprestimo) => emprestimo.id === id);
}


function atualizar(id, emprestimo) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        emprestimo.id = id; 
        listaEmprestimo[indice] = emprestimo;
        return Promise.resolve(listaEmprestimo[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceEmprestimo = buscarIndicePorId(id);
    if(indiceEmprestimo >= 0) {
        let emprestimoRemovido = listaEmprestimo.splice(indiceEmprestimo, 1)[0];
        return emprestimoRemovido;
    }
    return Promise.resolve(undefined);

}

module.exports = {
  listar,
  inserir,
  buscarEmprestimoPorId,
  atualizar,
  deletar,
}