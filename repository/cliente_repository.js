// repository/cliente_repository.js
let listaClientes = [];

function listar() {
    return Promise.resolve(listaClientes);
}

function inserir(cliente) {
    // Simula auto-incremento de ID interno
    cliente.id = listaClientes.length > 0 ? listaClientes[listaClientes.length - 1].id + 1 : 1;
    // Inicializa a contagem de livros emprestados (RN Aluno 3)
    cliente.borrowedCount = 0;
    listaClientes.push(cliente);
    return Promise.resolve(cliente);
}

function buscarPorMatricula(matricula) {
    // Busca por Matrícula (RN Aluno 3)
    return Promise.resolve(listaClientes.find(c => c.matricula === matricula));
}

function buscarPorId(id) {
    return Promise.resolve(listaClientes.find(c => c.id === Number(id)));
}

function atualizarContagemEmprestimo(matricula, borrowedCount) {
    let cliente = listaClientes.find(c => c.matricula === matricula);
    if (cliente) {
        cliente.borrowedCount = borrowedCount;
        return Promise.resolve(cliente);
    }
    return Promise.resolve(undefined);
}

function atualizar(matricula, clienteAtual) {
    let indice = listaClientes.findIndex(c => c.matricula === matricula);
    if(indice >= 0) {
        // Preserva o ID interno e borrowedCount
        clienteAtual.id = listaClientes[indice].id;
        clienteAtual.borrowedCount = listaClientes[indice].borrowedCount;
        listaClientes[indice] = clienteAtual;
        return Promise.resolve(listaClientes[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(matricula) {
    let indiceCliente = listaClientes.findIndex(c => c.matricula === matricula);
    if(indiceCliente >= 0) {
        let clienteRemovido = listaClientes.splice(indiceCliente, 1)[0];
        return clienteRemovido;
    }
    return Promise.resolve(undefined);
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