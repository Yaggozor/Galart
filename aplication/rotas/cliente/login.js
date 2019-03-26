module.exports = (app) => {

    app.get("/login", (req, res) => {
        app.aplication.controller.cliente.login.index(app, req, res);
    });

    app.post("/autenticar", (req, res) => {
        app.aplication.controller.cliente.login.autenticacao(app, req, res);
    });

    app.get("/encerrar", (req, res) => {
        app.aplication.controller.cliente.login.sair(app, req, res);
    });

}