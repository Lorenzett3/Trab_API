let listaAutores = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaAutores);
}

function inserir(autor) {
    autor.id = autoIncrement++;
    listaAutores.push(autor);
    return Promise.resolve(autor);
}

function buscarPorId(id) {
    return Promise.resolve(listaAutores.find(
        function(autor) {
            return (autor.id == id);        
        }
    ));
}

function buscarIndicePorId(id) {
    return listaAutores.findIndex((autor) => autor.id === id);
}

function atualizar(id, autorAtual) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        autorAtual.id = id; 
        listaAutores[indice] = autorAtual;
        return Promise.resolve(listaAutores[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceAutor = buscarIndicePorId(id);
    if(indiceAutor >= 0) {
        let autorRemovido = listaAutores.splice(indiceAutor, 1)[0];
        return autorRemovido;
    }
    return Promise.resolve(undefined);

}

function pesquisarPorAutor(nome) {
    return Promise.resolve(listaAutores.filter( (autor) => autor.nome == nome ));
}

function pesquisarPorNomeLike(nome) {
    return Promise.resolve(listaAutores.filter ( (autor) => {
        const autorNomeUpper = autor.nome.toUpperCase();
        const autorUpper = nome.toUpperCase();
        return (autorNomeUpper.search(autorUpper) >= 0);
    }));
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