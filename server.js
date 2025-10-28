const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).send({ mensagem: "API da Biblioteca - Aluno 3 está rodando!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});