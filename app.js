const express = require ("express")
const livroRouter = require("./router/livro_router")
const autorRouter = require("./router/autor_router")
const usuarioRouter = require("./router/usuario_router")
const loginController = require("./controller/login_controller")

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) =>{
    setTimeout(() => {
        res.send('Hello World!')
    }, 1000);
})

app.post("/api/login", loginController.realizarLogin)

app.use("/api/usuarios", usuarioRouter);

app.use("/api/livros", livroRouter);

app.use("/api/editoras", autorRouter);

app.listen(port, () => {
    console.log(`API running on port ${port}`)
})