// repository/livro_repository.js
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

    const res = await cliente.query("SELECT * FROM livros ORDER BY id");
    const listaLivros = res.rows;

    await cliente.end();

    return listaLivros;
}

async function inserir(livros) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `INSERT INTO livros (nome, ISBN, autor, editora, numPaginas)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *`;

    const values = [ livros.nome, livros.ISBN, livros.autor, livros.editora, livros.numPaginas ];
    const res = await cliente.query(sql, values);
    
    const livroInserido = res.rows[0];

    await cliente.end();

    return livroInserido;
}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM livros WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const livroEncontrado = result.rows[0];
    return (livroEncontrado);
}

async function atualizar(id, livros) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `UPDATE livros set nome=$1, ISBN=$2, autor=$3, editora=$4, numPaginas=$5
                WHERE id=$5
                RETURNING *`;

    const values = [livros.nome, livros.ISBN, livros.autor, livros.editora, livros.numPaginas, id];
    
    const res = await cliente.query(sql, values);

    await cliente.end();

    const livroAtualizado = res.rows[0];
    return (livroAtualizado);
}

async function deletar(id) {
    const sql = "DELETE FROM livros WHERE id=$1 RETURNING *"
    const values = [id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const livroDeletado = result.rows[0];
    return (livroDeletado);
}

async function pesquisarPorNome(livros) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM livros WHERE nome=$1";
    const result = await cliente.query(sql, livros.nome);

    await cliente.end();

    const livroEncontrado = result.rows[0];
    return (livroEncontrado);
}

async function pesquisarPorNomeLike(livros) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM livros WHERE nome LIKE $1";
    const result = await cliente.query(sql, livros.nome);

    await cliente.end();

    const livroEncontrado = result.rows[0];
    return (livroEncontrado);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorNome,
    pesquisarPorNomeLike
}