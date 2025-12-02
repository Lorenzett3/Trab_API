const emprestimoRepository = require("../repositoryBD/emprestimo_repository_bd");

async function retirarLivro() {
  if (emprestimos.livro_emprestado == False || emprestimos.livro_emprestado == Null) {
    if (dataRetirada && dataEntrega && nomeCliente && nomelivros) {
      return await emprestimoRepository.inserir(emprestimos)
    } 
    else{
      //Erro
      throw { id: 400, msg: "Data de retirada, data de entrega, nome do cliente e nome dos livros incorretos."};
    }
  }
  else{
    throw { id: 401, msg: "O livo está emprestado, retirada não autorizada."};
  }

}

module.exports = {
  retirarLivro
}