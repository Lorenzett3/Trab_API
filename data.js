// data.js

// Variáveis para simular IDs incrementais
let nextTipoClienteId = 3; // Começa em 3, pois 1 e 2 já existem
let nextClienteMatricula = 1003; // Começa em 1003

// --- DADOS EM MEMÓRIA ---

// 1. Entidade de CRUD Simples (Tipos de Cliente)
const tiposClientes = [
    { id: 1, nome: 'Comum', maxLivros: 3 },
    { id: 2, nome: 'Premium', maxLivros: 10 },
];

// 2. Entidade de CRUD com Relacionamento (Clientes)
const clientes = [
    { matricula: 1001, nome: 'João Silva', tipoClienteId: 1, email: 'joao@email.com', telefone: '9999-0000', livrosEmprestadosAtualmente: 1 },
    { matricula: 1002, nome: 'Maria Souza', tipoClienteId: 2, email: 'maria@email.com', telefone: '9999-1111', livrosEmprestadosAtualmente: 5 },
];

// 3. Registros de Empréstimo (Para RN de Devolução/Empréstimo)
const emprestimos = [];

// 4. Usuários para Autenticação (Conceito A)
const usuarios = [];


// --- FUNÇÕES DE AJUDA PARA BUSCA ---

function findTipoClienteById(id) {
    return tiposClientes.find(t => t.id === parseInt(id));
}

function findClienteByMatricula(matricula) {
    return clientes.find(c => c.matricula === parseInt(matricula));
}

// Exporta as listas e as funções de ajuda
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