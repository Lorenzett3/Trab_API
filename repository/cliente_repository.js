const { data } = require('../data');
const listaClientes = data.clients;

function listar() {
    return Promise.resolve(listaClientes);
}

function inserir(cliente) {
    cliente.id = listaClientes.length > 0 ? listaClientes[listaClientes.length - 1].id + 1 : 1; 
    listaClientes.push(cliente);
    return Promise.resolve(cliente);
}

function buscarPorMatricula(matricula) {
    return Promise.resolve(listaClientes.find(c => c.matricula == matricula));
}

function atualizarContagemEmprestimo(matricula, count) {
    return Promise.resolve(listaClientes.find(c => c.matricula == matricula));
}

module.exports = {
    listar,
    inserir,
    buscarPorMatricula,
    // ...
}