module.exports = (app) => {

    app.get("/cadastro", (req, res) => {
        app.aplication.controller.cliente.cadastro.index(app, req, res);
    });

}