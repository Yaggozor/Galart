module.exports = (app) => {

    app.post("/arteDetalhe", (req, res) => {
        app.aplication.controller.cliente.arteDetalhe.index(app, req, res);
    });

}