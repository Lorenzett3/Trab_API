// controller/emprestimo.controller.js
const emprestimoService = require('../service/emprestimo_service');
const devolucaoService = require('../service/devolucao_service'); 

async function retirarLivros(req, res) {
    try {
        const { clientMatricula, books } = req.body;
        
        const loan = await emprestimoService.retirarLivros(clientMatricula, books);
        
        return res.status(201).json({ 
            message: 'Empréstimo registrado com sucesso.',
            loan: loan,
            details: `Data de Entrega Calculada: ${loan.dueDate}`
        });

    } catch (error) {
        return res.status(error.id || 500).json({ message: error.msg || 'Erro interno ao registrar empréstimo.' });
    }
}

async function devolverLivros(req, res) {
    try {
        const { loanId, booksReturned } = req.body;
        
        const result = await devolucaoService.devolverLivro(loanId, booksReturned);

        return res.status(200).json({ 
            message: 'Devolução registrada com sucesso.',
            loan: result.loan,
            delayDetails: result.delayDetails
        });

    } catch (error) {
        return res.status(error.id || 500).json({ message: error.msg || 'Erro interno ao registrar devolução.' });
    }
}

async function listar(req, res) {
    try {
        const emprestimos = await emprestimoService.listar(); 
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(error.id || 500).json({ 
            message: error.msg || 'Erro ao listar empréstimos.' 
        });
    }
}

module.exports = {
    retirarLivros,
    devolverLivros,
    listar
}
