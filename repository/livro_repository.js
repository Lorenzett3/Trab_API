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
    return Promise.resolve(listaLivros.find(
        function(livro) {
            return (livro.id == Number(id));        
        }
    ));
}

function buscarIndicePorId(id) {
    return listaLivros.findIndex((livro) => livro.id === Number(id));
}

function pesquisarPorNome(nome) {
    return Promise.resolve(listaLivros.find( (livro) => livro.nome === nome ));
}

function pesquisarPorNomeLike(nome) {
    return Promise.resolve(listaLivros.filter ( (livro) => {
        const NomeLivroUpper = livro.nome.toUpperCase();
        const nomeUpper = nome.toUpperCase();
        return (NomeLivroUpper.includes(nomeUpper));
    }));
}


function atualizar(id, livroAtual) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        livroAtual.id = Number(id); 
        livroAtual.disponivel = listaLivros[indice].disponivel;
        listaLivros[indice] = livroAtual;
        return Promise.resolve(listaLivros[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceLivro = buscarIndicePorId(id);
    if(indiceLivro >= 0) {
        let livroRemovido = listaLivros.splice(indiceLivro, 1)[0];
        return livroRemovido;
    }
    return Promise.resolve(undefined);

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