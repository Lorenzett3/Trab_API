>>>API de Gerenciamento de Biblioteca (Trab_API)

Bem-vindo ao projeto da API de Gerenciamento de Biblioteca. Este documento contém as regras de negócio implementadas (Aluno 3) e o guia rápido de execução e colaboração Git para a equipe.
Este documento está formatado de forma técnica para garantir a clareza e a precisão das informações e dos comandos Git, essenciais para o trabalho em equipe.
Minha parte cobriu toda a lógica central da API, estruturada em módulos (Controllers e Routes).
Regras de Negócio Críticas (RN)

Limite de Empréstimo: O cliente só pode retirar livros se o total de emprestados não exceder o limite definido pelo seu Tipo de Cliente (ex: Graduação = 3 livros).
Autenticação: Todas as rotas administrativas são protegidas por Token JWT, gerado no login.
Devolução: A devolução reduz o contador de livros emprestados (borrowedCount), liberando o cliente para novas locações.

>>>Guia Rápido de Execução
cd Trab_API
>>>Instalar todas as dependências
npm install
>>>Executar o Servidor
node server.js
Credencial de Teste: admin@bib.com / 123456







