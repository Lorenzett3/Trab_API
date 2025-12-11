// repository/cliente_repository.js
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

    const res = await cliente.query("SELECT * FROM clientes ORDER BY id");
    const listaEmprestimos = res.rows;

    await cliente.end();

    return listaEmprestimos;
}

async function inserir(clientes) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `INSERT INTO clientes (matricula, nome, client_type_id, email)
                VALUES ($1, $2, $3, $4)
                RETURNING *`;

    const values = [ clientes.matricula, clientes.nome, clientes.client_type_Id, clientes.email ];
    const res = await cliente.query(sql, values);
    
    const clientesInserido = res.rows[0];

    await cliente.end();

    return clientesInserido;
}

async function buscarPorMatricula(matricula) {
    // Busca por Matrícula (RN Aluno 3)
    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM clientes WHERE matricula=$1";
    const result = await cliente.query(sql, [matricula]);

    await cliente.end();

    const matriculaClienteEncontrada = result.rows[0];
    return (matriculaClienteEncontrada);
}

async function buscarPorId(id) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = "SELECT * FROM clientes WHERE id=$1";
    const result = await cliente.query(sql, [id]);

    await cliente.end();

    const clienteEncontrado = result.rows[0];
    return (clienteEncontrado);
}

function atualizarContagemEmprestimo(matricula, borrowedCount) {
    let cliente = listaClientes.find(c => c.matricula === matricula);
    if (cliente) {
        cliente.borrowedCount = borrowedCount;
        return Promise.resolve(cliente);
    }
    return Promise.resolve(undefined);
}

async function atualizar(id, clientes) {

    const cliente = new Client(confCliente);
    await cliente.connect();

    const sql = `UPDATE clientes set matricula=$1, nome=$2, client_type_id=$3, email=$4
                WHERE id=$5
                RETURNING *`;

    const values = [clientes.matricula, clientes.nome, clientes.client_type_id, clientes.email, id];
    
    const res = await cliente.query(sql, values);

    await cliente.end();

    const clienteAtualizado = res.rows[0];
    return (clienteAtualizado);
}

async function deletar(matricula) {

    const sql = "DELETE FROM clientes WHERE matricula=$1 RETURNING *"
    const values = [matricula];

    const cliente = new Client(confCliente);
    await cliente.connect();

    const result = await cliente.query(sql, values);

    await cliente.end();

    const clienteDeletado = result.rows[0];
    return (clienteDeletado);
}


module.exports = {
    listar,
    inserir,
    buscarPorMatricula,
    atualizarContagemEmprestimo,
    buscarPorId,
    atualizar,
    deletar
}