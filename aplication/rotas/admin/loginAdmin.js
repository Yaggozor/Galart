module.exports = (app) => {

    app.get("/galart-login-admin", (req, res) => {
        app.aplication.controller.admin.loginAdmin.index(app, req, res);
    });

    app.post("/autenticacao", (req, res) => {
        app.aplication.controller.admin.loginAdmin.autenticacao(app, req, res);
    });

    app.get("/sair", (req, res) => {
        app.aplication.controller.admin.loginAdmin.sair(app, req, res);
    });

}