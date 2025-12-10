// repository/emprestimo_repository.js
const { Client } = require("pg");

const confCliente = {
    user: "postgres",
    password: "password",
    host:"localhost",
    port: 5432,
    database: "crud_biblioteca" 
}


async function listar() {
    const cliente = new Client(confCliente);

    await cliente.connect();

    const res = await cliente.query("SELECT * FROM emprestimos ORDER BY id");
    const listaEmprestimos = res.rows;

    await cliente.end();

    return listaEmprestimos;
}

async function inserir(emprestimos) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `INSERT INTO emprestimos (data_retirada, data_entrega, nome_cliente, emprestar_livros)
                VALUES ($1,$2,$3,$4)
                RETURNING *`;

    const values = [emprestimos.data_retirada, emprestimos.data_entrega, emprestimos.nome_cliente, emprestimos.emprestar_livros];
    const res = await cliente.query(sql, values);
    
    const emprestimoInserido = res.rows[0];

    await cliente.end();

    return emprestimoInserido;
}

async function buscarEmprestimoPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM emprestimos WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const emprestimoEncontrado = result.rows[0];
    return (emprestimoEncontrado);
}

async function atualizar(id, emprestimos) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `UPDATE emprestimos set data_retirada=$1, data_entrega=$2, nome_cliente=$3, emprestar_livros=$4
                WHERE id=$5
                RETURNING *`;

    const values = [emprestimos.data_retirada, emprestimos.data_entrega, emprestimos.nome_cliente, emprestimos.emprestar_livros, id];
    
    const res = await cliente.query(sql, values);

    await cliente.end();

    const emprestimoAtualizado = res.rows[0];
    return (emprestimoAtualizado);
}

async function deletar(id) {
    const sql = "DELETE FROM emprestimos WHERE id=$1 RETURNING *"
    const values = [id];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const emprestimoDeletado = result.rows[0];
    return (emprestimoDeletado);
}

module.exports = {
  listar,
  inserir,
  buscarEmprestimoPorId,
  atualizar,
  deletar,
}