const { Client } = require("pg");

const confCliente = {
    user: "postgres",
    password: "password",
    host:"localhost",
    port: 5432,
    database: "crud_alunos" 
}

// !tipo.name || typeof tipo.maxBooks
async function listar() {
    const cliente = new Client(confCliente);

    await cliente.connect();

    const res = await cliente.query("SELECT * FROM tipo_cliente ORDER BY id");
    const listaLivros = res.rows;

    await cliente.end();

    return listaLivros;
}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM tipo_cliente WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const livroEncontrado = result.rows[0];
    return (livroEncontrado);
}


module.exports = {
    listar,
    buscarPorId,
}