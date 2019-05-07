module.exports = (app) => {

    app.get('/historicoDeCompras', (req, res) => {
        app.aplication.controller.cliente.historicoCompra.index(app, req, res);
    });

}