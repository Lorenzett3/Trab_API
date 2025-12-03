// repository/emprestimo_repository.js
let listaEmprestimo = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaEmprestimo);
}

function inserir(emprestimo) {
    emprestimo.id = autoIncrement++;
    emprestimo.livro_emprestado = true; 
    emprestimo.isReturned = false;
    listaEmprestimo.push(emprestimo);
    return Promise.resolve(emprestimo);
}

function buscarEmprestimoPorId(id) {
    return Promise.resolve(listaEmprestimo.find(e => e.id == Number(id)));
}

function atualizar(id, emprestimo) {
    let indice = listaEmprestimo.findIndex(e => e.id === Number(id));
    if(indice >= 0) {
        emprestimo.id = Number(id); 
        listaEmprestimo[indice] = emprestimo;
        return Promise.resolve(listaEmprestimo[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceEmprestimo = listaEmprestimo.findIndex(e => e.id === Number(id));
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