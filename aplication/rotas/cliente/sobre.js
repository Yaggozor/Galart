module.exports = (app) => {

    app.get("/sobre", (req, res) => {
        app.aplication.controller.cliente.sobre.index(app, req, res);
    });

}