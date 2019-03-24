module.exports.index = (app, req, res) => {
    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);
    
    var admin = null;
    var formData = req.body;

    ProdutoDAO.mostrarProduto(formData, res, admin);
}