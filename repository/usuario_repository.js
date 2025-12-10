// repository/usuario_repository.js
const { data } = require('../data'); 

const listaUsuarios = data.users;

let autoIncrement = listaUsuarios.length > 0 ? listaUsuarios[listaUsuarios.length - 1].id + 1 : 1;

function listar() {
    return Promise.resolve(listaUsuarios);
}

function cadastrarUsuario(usuario) {
    usuario.id = autoIncrement++;
    listaUsuarios.push(usuario);
    return Promise.resolve(usuario);
}

function buscarPorId(id) {
    return Promise.resolve(listaUsuarios.find(
        function(usuario) {
            return (usuario.id == Number(id));        
        }
    ));
}

function buscarPorEmail(email) {
    const emailToSearch = email.toLowerCase().trim();

    return Promise.resolve(listaUsuarios.find(
        function(usuario) {
            return (usuario.email.toLowerCase() === emailToSearch);
        }
    ));
}

module.exports = {
    listar,
    cadastrarUsuario,
    buscarPorId,
    buscarPorEmail
}