module.exports.index = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    //var conexao = app.dbConfig.database;
    //var TransacaoDAO = new app.aplication.model.TransacaoDAO(conexao);
    var TransacaoDAO = new app.aplication.model.TransacaoDAO_prod();

    TransacaoDAO.mostrarCompra(req, res);

}