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

    const res = await cliente.query("SELECT * FROM editora ORDER BY id");
    const listaEditora = res.rows;

    await cliente.end();

    return listaEditora;
}

async function inserir(editora) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "INSERT INTO editora (nome, cidade, email) VALUES ($1, $2, $3) RETURNING *";

    const values = [ editora.nome, editora.cidade, editora.email ];
    const res = await cliente.query(sql, values);
    
    const usuarioInserido = res.rows[0];

    await cliente.end();

    return usuarioInserido;    
}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM editora WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const editoraEncontrada = result.rows[0];
    return (editoraEncontrada);
}

async function buscarPorEmail(email) {
    console.log("email", email);
    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM editora WHERE email=$1";
    const result = await cliente.query(sql, [email]);

    await cliente.end();

    const editoraEncontrada = result.rows[0];
    return (editoraEncontrada);
}

async function atualizar(id, editoraAtual) {

    const sql = 'UPDATE editora set nome=$1, cidade=$2, email=$3 WHERE id=$4 RETURNING *'
    const values = [editoraAtual.nome, editoraAtual.cidade, editoraAtual.email, id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const editoraAtualizado = result.rows[0];
    return (editoraAtualizado);
}

async function deletar(id) {

    const sql = 'DELETE FROM editora WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const editoraDeletada = result.rows[0];
    return (editoraDeletada);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEmail,
    atualizar,
    deletar
}