module.exports = (app) => {

    app.get('/carrinho', (req, res) => {
        app.aplication.controller.cliente.carrinho.index(app, req, res);
    })

}