module.exports = (app) => {

    app.get("/pedidos", (req, res) => {
        app.aplication.controller.cliente.pedidos.index(app, req, res);
    });

    app.post("/pedidos", (req, res) => {
        app.aplication.controller.cliente.pedidos.enviarPedido(app, req, res);
    });

}