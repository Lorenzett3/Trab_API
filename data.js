let nextTipoClienteId = 3;
let nextClienteMatricula = 1003;
let nextEmprestimoId = 1;

const tiposClientes = [
    { id: 1, nome: 'Comum', maxLivros: 3 },
    { id: 2, nome: 'Premium', maxLivros: 10 },
];

const clientes = [
    { matricula: 1001, nome: 'João Silva', tipoClienteId: 1, email: 'joao@email.com', telefone: '9999-0000', livrosEmprestadosAtualmente: 1 },
    { matricula: 1002, nome: 'Maria Souza', tipoClienteId: 2, email: 'maria@email.com', telefone: '9999-1111', livrosEmprestadosAtualmente: 5 },
];

const emprestimos = [];
const usuarios = [];


function findTipoClienteById(id) {
    return tiposClientes.find(t => t.id === parseInt(id));
}

function findClienteByMatricula(matricula) {
    return clientes.find(c => c.matricula === parseInt(matricula));
}

module.exports = {
    tiposClientes,
    nextTipoClienteId,
    clientes,
    nextClienteMatricula,
    emprestimos,
    usuarios,
    findTipoClienteById,
    findClienteByMatricula,
};