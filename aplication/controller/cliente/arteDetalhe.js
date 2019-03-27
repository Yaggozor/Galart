module.exports.index = (app, req, res) => {
    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    var user = null;
    var admin = null;
    var formData = req.body;

    if (req.session.authorized) {
        user = req.session.nome;
    }

    ProdutoDAO.mostrarProduto(formData, res, admin, user);
}