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

    const res = await cliente.query("SELECT * FROM autores ORDER BY id");
    const listaAutores = res.rows;

    await cliente.end();

    return listaAutores;
}

async function inserir(autor) {
    //Instancia cliente
    const cliente = new Client(confCliente);
    //conectar
    await cliente.connect();
    //executar query
    const sql = "INSERT INTO autores (nome, pais) VALUES ($1,$2) RETURNING *";
    const values = [autor.nome, autor.pais];
    const res = await cliente.query(sql, values);
    const autorInserido = res.rows[0];
    //fechar a conexao
    await cliente.end();

    return autorInserido;
}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM autores WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const autorEncontrado = result.rows[0];
    return (autorEncontrado);
}

async function atualizar(id, autor) {

    const sql = 'UPDATE autores set nome=$1, pais=$2 WHERE id=$3 RETURNING *'
    const values = [autor.nome, autor.pais, id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const autorAtualizado = result.rows[0];
    return (autorAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM autores WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const autorDeletado = result.rows[0];
    return (autorDeletado);
}

async function pesquisarPorAutor(autor) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM autores WHERE nome=$1";
    const result = await cliente.query(sql, autor.nome);

    await cliente.end();

    const autorEncontrado = result.rows[0];
    return (autorEncontrado);
}

async function pesquisarPorNomeLike(autor) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM autores WHERE nome LIKE $1";
    const result = await cliente.query(sql, autor.nome);

    await cliente.end();

    const autorEncontrado = result.rows[0];
    return (autorEncontrado);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorAutor,
    pesquisarPorNomeLike
}