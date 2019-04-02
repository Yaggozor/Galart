module.exports = (app) => {

    app.get("/cadastro", (req, res) => {
        app.aplication.controller.cliente.cadastro.index(app, req, res);
    });

    app.post("/cadastro", (req, res) => {
        app.aplication.controller.cliente.cadastro.inserindoCliente(app, req, res);
    });

}