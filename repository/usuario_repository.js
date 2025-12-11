// repository/usuario_repository.js
const { Client } = require("pg");

const confCliente = {
    user: "postgres",
    password: "password",
    host:"localhost",
    port: 5432,
    database: "crud_alunos" 
}

async function listar() {
    const cliente = new Client(confCliente);

    await cliente.connect();

    const res = await cliente.query("SELECT * FROM usuario ORDER BY id");
    const listaUsuarios = res.rows;

    await cliente.end();

    return listaUsuarios;
}

async function cadastrarUsuario(usuarios) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `INSERT INTO usuario (nome, email, senha)
                VALUES ($1, $2, $3)
                RETURNING *`;

    const values = [ usuarios.nome, usuarios.email, usuarios.senha ];
    const res = await cliente.query(sql, values);
    
    const usuarioInserido = res.rows[0];

    await cliente.end();

    return usuarioInserido;

}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM usuario WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const usuarioEncontrado = result.rows[0];
    return (usuarioEncontrado);
}


async function buscarPorEmail(email) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM usuario WHERE email=$1";
    const result = await cliente.query(sql, [email]);

    await cliente.end();

    const usuarioEncontrado = result.rows[0];

    return (usuarioEncontrado);
}

module.exports = {
    listar,
    cadastrarUsuario,
    buscarPorId,
    buscarPorEmail
}