function realizaLog(req, res, next) {
    let rotaAcessada = `Rota acessada: ${req.method} ${req.path}`;
    let requestTime = Date.now();

    res.on("finish", () => {
        let statusRetorno = `Status de Retorno: ${res.statusCode}`;
        let tempoExec = Date.now() - requestTime;
        console.log(rotaAcessada);
        console.log(statusRetorno);
        console.log("Tempo de execução: "+tempoExec);

    });
    next();
}

module.exports = {
    realizaLog
}