// repository/livro_repository.js
let listaLivros = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaLivros);
}

function inserir(livro) {
    livro.id = autoIncrement++;
    livro.disponivel = true; 
    listaLivros.push(livro);
    return Promise.resolve(livro);
}

function buscarPorId(id) {
    return Promise.resolve(listaLivros.find(l => l.id == Number(id)));
}

function pesquisarPorNome(nome) {
    return Promise.resolve(listaLivros.find(l => l.nome === nome));
}

function atualizarStatusDisponibilidade(nomeLivro, disponivel) {
    let livro = listaLivros.find(l => l.nome === nomeLivro);
    if (livro) {
        livro.disponivel = disponivel;
        return Promise.resolve(livro);
    }
    return Promise.resolve(undefined);
}

function buscarEmprestimoPorId(id) {
    return Promise.resolve(listaEmprestimo.find(e => e.id == Number(id)));
}

function atualizar(id, emprestimo) {
    let indice = listaEmprestimo.findIndex(e => e.id === Number(id));
    if(indice >= 0) {
        emprestimo.id = Number(id); 
        listaEmprestimo[indice] = emprestimo;
        return Promise.resolve(listaEmprestimo[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceEmprestimo = listaEmprestimo.findIndex(e => e.id === Number(id));
    if(indiceEmprestimo >= 0) {
        let emprestimoRemovido = listaEmprestimo.splice(indiceEmprestimo, 1)[0];
        return emprestimoRemovido;
    }
    return Promise.resolve(undefined);
}


module.exports = {
    listar,
    inserir,
    buscarEmprestimoPorId,
    atualizar,
    deletar,
}