const { data } = require('../data');
const listaTipos = data.clientTypes;

function listar() {
    return Promise.resolve(listaTipos);
}

function buscarPorId(id) {
    return Promise.resolve(listaTipos.find(t => t.id == id));
}


module.exports = {
    listar,
    buscarPorId,
}