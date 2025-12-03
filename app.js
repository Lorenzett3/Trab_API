// app.js
const express = require ("express");
const { PORT } = require("./data");
const { realizarLogin } = require("./controller/login_controller");
const { realizaLog } = require("./middleware/logger_middleware"); 

const livroRouter = require("./router/livro_router");
const autorRouter = require("./router/autor_router");
const usuarioRouter = require("./router/usuario_router");
const emprestimoRouter = require("./router/emprestimo_router");

const editoraRouter = require("./router/editora_router");
const clienteRouter = require("./router/cliente_router"); 

const app = express();

app.use(realizaLog); 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Biblioteca Funcional - Unificada (A1, A2, A3).');
});

app.post("/api/login", realizarLogin);

app.use("/api/usuarios", usuarioRouter);
app.use("/api/autores", autorRouter);
app.use("/api/livros", livroRouter);
app.use("/api/editoras", editoraRouter);
app.use("/api/clientes", clienteRouter); 
app.use("/api/emprestimos", emprestimoRouter); 

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});