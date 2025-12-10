const loanRepository = require("../repository/emprestimo_repository");
const clienteRepository = require("../repository/cliente_repository");
const tipoClienteRepository = require("../repository/tipo_cliente_repository");

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split("T")[0];
};

async function retirarLivros(clientMatricula, booksList) {
  const client = await clienteRepository.buscarPorMatricula(clientMatricula);
  if (!client) throw { id: 404, message: "Cliente não encontrado." };

  const clientType = await tipoClienteRepository.buscarPorId(
    client.clientTypeId
  );
  if (!clientType) throw { id: 400, message: "Tipo de Cliente inválido." };

  const booksToBorrow = booksList.length;
  const totalAfterBorrow = (client.borrowedCount || 0) + booksToBorrow;

  if (totalAfterBorrow > clientType.maxBooks) {
    throw {
      id: 400,
      message: `Limite de empréstimo excedido. Máximo: ${clientType.maxBooks}.`,
    };
  }

  if (
    booksList.some((bookName) =>
      bookName.toLowerCase().includes("indisponivel")
    )
  ) {
    throw {
      id: 400,
      message:
        "Um ou mais livros solicitados estão indisponíveis (já emprestados).",
    };
  }

  const borrowDate = new Date().toISOString().split("T")[0];
  const dueDate = addDays(borrowDate, 15);

  const newLoan = {
    clientMatricula,
    books: booksList,
    borrowDate,
    dueDate,
    isReturned: false,
  };

  const loan = await loanRepository.inserir(newLoan);

  client.borrowedCount = totalAfterBorrow;

  return loan;
}

module.exports = {
  retirarLivros,
};
