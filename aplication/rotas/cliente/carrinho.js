module.exports = (app) => {

    app.get('/carrinho', (req, res) => {
        app.aplication.controller.cliente.carrinho.index(app, req, res);
    })

    app.post('/carrinho', (req, res) => {
        app.aplication.controller.cliente.carrinho.addCarrinho(app, req, res);
    })

    app.post('/pagamentoBoleto', (req, res) => {
        app.aplication.controller.cliente.carrinho.pagamentoBoleto(app, req, res);
    })

    /*app.post('/pagamentoCartao', (req, res) => {
        app.aplication.controller.cliente.carrinho.pagamentoCartao(app, req, res);
    })*/

}