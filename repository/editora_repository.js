const { data } = require('../data');
const listaEditoras = data.publishers;

function listar() {
    return Promise.resolve(listaEditoras);
}

function inserir(editora) {
    editora.id = listaEditoras.length > 0 ? listaEditoras[listaEditoras.length - 1].id + 1 : 1; 
    listaEditoras.push(editora);
    return Promise.resolve(editora);
}

function buscarPorId(id) {
    return Promise.resolve(listaEditoras.find(p => p.id == id));
}

function buscarPorEmail(email) {
    return Promise.resolve(listaEditoras.find(p => p.email == email));
}

function atualizar(id, editoraAtual) {
    let indice = listaEditoras.findIndex(p => p.id === id);
    if(indice >= 0) {
        editoraAtual.id = id; 
        listaEditoras[indice] = editoraAtual;
        return Promise.resolve(listaEditoras[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indice = listaEditoras.findIndex(p => p.id === id);
    if(indice >= 0) {
        let editoraRemovida = listaEditoras.splice(indice, 1)[0];
        return editoraRemovida;
    }
    return Promise.resolve(undefined);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEmail,
    atualizar,
    deletar
}