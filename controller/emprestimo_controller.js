const emprestimoService = require('../services/emprestimo_service');

async function inserir(req, res) {
  try {
    // 1. Receber os atributos do empréstimo e do cliente
    const { clientId, amount, termInMonths } = req.body;
    
    // 2. Chamar o Service, passando os atributos
    const loan = await emprestimoService.processRequest({ clientId, amount, termInMonths });
    
    // 3. Responder ao cliente com o status 201 (Criado)
    return res.status(201).json(loan);

  } catch (error) {
    // 4. Tratar e padronizar a resposta de erro
    if (error.isClientError) {
       return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = {
  inserir
}