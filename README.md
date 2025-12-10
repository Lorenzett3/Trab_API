Documentação da API de Gerenciamento de Biblioteca

Este documento detalha a estrutura, as funcionalidades e as regras de negócio unificadas da API de gerenciamento de biblioteca, desenvolvida em Node.js e Express.

1. Estrutura do Projeto e Arquitetura

O projeto utiliza a arquitetura em camadas Controller -> Service -> Repository para separar responsabilidades.

Camada Controller: Lida com requisições HTTP (req, res).

Camada Service: Contém a Lógica de Negócio (RNs e validações complexas).

Camada Repository: Responsável pelo acesso aos dados em memória (simulação de banco de dados).

Camada Middleware: Lida com segurança (JWT) e logging.

Estrutura de Diretórios

TRAB_API/

├── controller/      # Recebe requisições e chama o Service

├── middleware/      # Logger e Autenticação JWT

├── repository/      # Acesso aos arrays de dados (memória)

├── router/          # Definição de URLs

├── service/         # Lógica de Negócio e Validação

├── data.js          # Base de dados centralizada (arrays)

└── app.js           # Ponto de entrada e montagem das rotas


2. Unificação de Requisitos e Regras de Negócio (RNs)

O código atual unifica os requisitos de Cadastro, Clientes e Transações (Empréstimo/Devolução), cobrindo as necessidades dos Alunos 1, 2 e 3.

2.1 Módulos de Cadastro

Módulo

Requisitos (RNs)

Usuário

Cadastro com Nome, E-mail e Senha. Login gera Token JWT.

Clientes

Matrícula, Nome, E-mail, Telefone e associação obrigatória a um Tipo de Cliente.

Tipos de Cliente

Define o nome do tipo e a Quantidade Máxima de Livros que o cliente pode retirar.

Autores

Nome e País de Origem.

Livros

ISBN, Nome, Autor(es), Editora, Páginas, Ano.

Editoras

Nome, Cidade e E-mail.

2.2 Transações e Regras de Empréstimo Unificadas

O módulo de Empréstimo e Devolução mescla múltiplas regras de negócio:

RN do Aluno 3 (Limite de Cliente): Na retirada, verifica se o total de livros emprestados não excede o limite máximo do Tipo de Cliente.

RN do Aluno 2 (Data de Entrega): A data_entrega é calculada automaticamente como +15 dias a partir da data de retirada.

RN do Aluno 1 (Disponibilidade): O livro só pode ser retirado se estiver disponível (lógica implementada na camada Service).

RN do Aluno 2 (Atraso na Devolução): A Devolução calcula o número de dias de atraso comparando data_devolucao com a data_entrega prevista.

3. Como Rodar a Aplicação

3.1 Pré-requisitos

Node.js (LTS) e npm.

Docker Desktop (Obrigatório para rodar o ambiente de forma consistente).

Ferramenta de teste HTTP (Insomnia ou Postman).

3.2 Execução no Terminal (Método Oficial)

IMPORTANTE: O servidor deve ser rodado usando o Docker.

Instalação de Dependências:

npm install


Executar o Servidor com Docker Compose:

docker compose up --build -d


(Este comando constrói a imagem e inicia o contêiner em segundo plano.)

O servidor iniciará na porta 3000.

3.3 Teste de Acesso Inicial

Todas as rotas de gerenciamento são protegidas por JWT.

Rota de Login (Não Protegida):

Método: POST

URL: http://localhost:3000/api/login

Credencial Padrão: {"email": "admin@mail.com", "senha": "123456"}

Ação: Copie o token JWT retornado.

Rota de Teste (Protegida):

Método: GET

URL: http://localhost:3000/api/autores

Header: Authorization: Bearer <SEU_TOKEN_AQUI>
