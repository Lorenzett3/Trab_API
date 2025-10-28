const data = require('./data');

function validateTipoCliente(req, res, next) {
    const { nome, maxLivros } = req.body;
    if (!nome || !maxLivros) {
        return res.status(400).json({ error: 'Campos "nome" e "maxLivros" são obrigatórios.' });
    }
    if (typeof maxLivros !== 'number' || maxLivros <= 0) {
        return res.status(400).json({ error: 'O campo "maxLivros" deve ser um número inteiro positivo.' });
    }
    next();
}

const listTiposClientes = (req, res) => {
    return res.status(200).json(data.tiposClientes);
};

const getTipoClienteById = (req, res) => {
    const tipo = data.findTipoClienteById(req.params.id);
    if (tipo) {
        return res.status(200).json(tipo);
    }
    return res.status(404).json({ error: 'Tipo de Cliente não encontrado.' });
};

const createTipoCliente = (req, res) => {
    const { nome, maxLivros } = req.body;
    const novoTipo = {
        id: data.nextTipoClienteId++,
        nome,
        maxLivros: parseInt(maxLivros)
    };
    data.tiposClientes.push(novoTipo);
    return res.status(201).json(novoTipo);
};

const updateTipoCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, maxLivros } = req.body;

    const tipoIndex = data.tiposClientes.findIndex(t => t.id === id);

    if (tipoIndex !== -1) {
        data.tiposClientes[tipoIndex] = {
            ...data.tiposClientes[tipoIndex],
            nome: nome || data.tiposClientes[tipoIndex].nome,
            maxLivros: parseInt(maxLivros) || data.tiposClientes[tipoIndex].maxLivros,
        };
        return res.status(200).json(data.tiposClientes[tipoIndex]);
    }
    return res.status(404).json({ error: 'Tipo de Cliente não encontrado.' });
};

const deleteTipoCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const tipoIndex = data.tiposClientes.findIndex(t => t.id === id);

    if (tipoIndex !== -1) {
        data.tiposClientes.splice(tipoIndex, 1);
        return res.status(204).send();
    }
    return res.status(404).json({ error: `Tipo de Cliente com ID ${id} não encontrado.` });
};


const createCliente = (req, res) => {
    const { nome, tipoClienteId, email, telefone } = req.body;
    const tipoCliente = data.findTipoClienteById(tipoClienteId);

    if (!tipoCliente) {
        return res.status(400).json({ error: 'Tipo de Cliente (ID) inválido. Relacionamento ausente.' });
    }

    const novoCliente = {
        matricula: data.nextClienteMatricula++,
        nome,
        tipoClienteId: parseInt(tipoClienteId),
        email,
        telefone,
        livrosEmprestadosAtualmente: 0
    };

    data.clientes.push(novoCliente);
    return res.status(201).json(novoCliente);
};

const realizarEmprestimo = (req, res) => {
    const { clienteMatricula, listaLivros } = req.body;
    const cliente = data.findClienteByMatricula(clienteMatricula);

    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    const tipoCliente = data.findTipoClienteById(cliente.tipoClienteId);

    if (!tipoCliente) {
        return res.status(500).json({
            error: 'Erro de integridade: Tipo de Cliente associado não encontrado.',
            tipoClienteId: cliente.tipoClienteId
        });
    }

    const livrosAEmprestar = Array.isArray(listaLivros) ? listaLivros.length : 0;
    const maxLivros = tipoCliente.maxLivros;
    const podeRetirar = (cliente.livrosEmprestadosAtualmente + livrosAEmprestar) <= maxLivros;

    if (!podeRetirar) {
        return res.status(422).json({
            error: `Limite de empréstimo excedido. Máximo: ${maxLivros}.`,
            detalhes: {
                livrosEmprestados: cliente.livrosEmprestadosAtualmente,
                livrosTentandoRetirar: livrosAEmprestar,
                maxPermitido: maxLivros
            }
        });
    }

    cliente.livrosEmprestadosAtualmente += livrosAEmprestar;

    const novoEmprestimo = {
        id: data.nextEmprestimoId++,
        clienteMatricula,
        listaLivros,
        dataRetirada: new Date().toISOString().split('T')[0],
        devolvido: false
    };
    data.emprestimos.push(novoEmprestimo);

    return res.status(200).json({
        mensagem: 'Empréstimo registrado com sucesso e contagem do cliente atualizada.',
        livrosEmprestadosAtualmente: cliente.livrosEmprestadosAtualmente
    });
};

const realizarDevolucao = (req, res) => {
    const { clienteMatricula, listaLivrosDevolvidos } = req.body;
    const cliente = data.findClienteByMatricula(clienteMatricula);

    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    const livrosDevolvidos = Array.isArray(listaLivrosDevolvidos) ? listaLivrosDevolvidos.length : 0;

    if (livrosDevolvidos === 0) {
        return res.status(400).json({ error: 'Nenhum livro listado para devolução.' });
    }

    cliente.livrosEmprestadosAtualmente -= livrosDevolvidos;

    if (cliente.livrosEmprestadosAtualmente < 0) {
        cliente.livrosEmprestadosAtualmente = 0;
    }

    return res.status(200).json({
        mensagem: 'Devolução registrada. Livros liberados para o cliente.',
        livrosEmprestadosAtualmente: cliente.livrosEmprestadosAtualmente
    });
};

module.exports = {
    validateTipoCliente,
    listTiposClientes,
    getTipoClienteById,
    createTipoCliente,
    updateTipoCliente,
    deleteTipoCliente,
    createCliente,
    realizarEmprestimo,
    realizarDevolucao
};