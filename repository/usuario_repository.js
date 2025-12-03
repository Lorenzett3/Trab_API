// repository/usuario_repository.js
let listaUsuarios = [
    { id:1, nome: "Admin", email: "admin@mail.com", senha: "123456" }
];
let autoIncrement = 2;

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
    return Promise.resolve(listaUsuarios.find(
        function(usuario) {
            return (usuario.email == email)
        }
    ));
}

module.exports = {
    listar,
    cadastrarUsuario,
    buscarPorId,
    buscarPorEmail
}