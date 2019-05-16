module.exports = (app) => {

    app.get('/admin/historicoDeTransacoes', (req, res) => {
        app.aplication.controller.admin.historicoTransacao.index(app, req, res);
    });

}