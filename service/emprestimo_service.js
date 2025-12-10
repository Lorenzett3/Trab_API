// service/emprestimo_service.js
const emprestimoRepository = require('../repository/emprestimo_repository');
const clienteRepository = require('../repository/cliente_repository');
const tipoClienteRepository = require('../repository/tipo_cliente_repository'); 
const livroRepository = require('../repository/livro_repository'); 

const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
};

async function retirarLivros(clientMatricula, booksList) {
    
    const client = await clienteRepository.buscarPorMatricula(clientMatricula);
    if (!client) throw { id: 404, msg: 'Cliente não encontrado.' };
    
    const clientType = await tipoClienteRepository.buscarPorId(client.clientTypeId);
    if (!clientType) throw { id: 400, msg: 'Tipo de Cliente (ID) inválido.' };

    const booksToBorrow = booksList.length;
    const totalAfterBorrow = (client.borrowedCount || 0) + booksToBorrow;
    const borrowDate = new Date().toISOString().split('T')[0];
    const dueDate = addDays(borrowDate, 15); 

    if (totalAfterBorrow > clientType.maxBooks) {
        throw { 
            id: 400, 
            msg: `Regra de Negócio: Limite de empréstimo excedido. Máximo: ${clientType.maxBooks}.`
        };
    }

    for (const bookName of booksList) {
        const livro = await livroRepository.pesquisarPorNome(bookName); 
        
        if (!livro) {
            throw { id: 404, msg: `Livro "${bookName}" não encontrado no cadastro.` };
        }
        if (livro && !livro.disponivel) {
            throw { id: 400, msg: `Livro "${bookName}" indisponível (já emprestado).` };
        }
    }

    const newLoan = {
        clientMatricula,
        books: booksList,
        borrowDate: borrowDate,
        dueDate: dueDate,
        isReturned: false,
    };

    const loan = await emprestimoRepository.inserir(newLoan);
    
    await clienteRepository.atualizarContagemEmprestimo(clientMatricula, totalAfterBorrow);

    return loan;
}

module.exports = {
    retirarLivros,
};