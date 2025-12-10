// repository/tipo_cliente_repository.js
const { v4: uuidv4 } = require('uuid');

let listaTipos = [
    { id: '1a', name: 'Graduação', maxBooks: 3 }, 
    { id: '2b', name: 'Pós-Graduação', maxBooks: 5 },
];

function listar() {
    return Promise.resolve(listaTipos);
}

function inserir(tipo) {
    tipo.id = uuidv4(); 
    listaTipos.push(tipo);
    return Promise.resolve(tipo);
}

function buscarPorId(id) {
    return Promise.resolve(listaTipos.find(t => t.id === id));
}

function buscarPorNome(name) {
    return Promise.resolve(listaTipos.find(t => t.name.toLowerCase() === name.toLowerCase()));
}

function atualizar(id, tipoAtual) {
    let indice = listaTipos.findIndex(t => t.id === id);
    if(indice >= 0) {
        tipoAtual.id = id; 
        listaTipos[indice] = tipoAtual;
        return Promise.resolve(listaTipos[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indice = listaTipos.findIndex(t => t.id === id);
    if(indice >= 0) {
        let tipoRemovido = listaTipos.splice(indice, 1)[0];
        return tipoRemovido;
    }
    return Promise.resolve(undefined);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorNome, 
    atualizar,
    deletar
};