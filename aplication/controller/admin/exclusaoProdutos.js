module.exports.excluindoProduto = (app, req, res) => {
    
    var formData = req.body;

    //var conexao = app.dbConfig.database;
    //var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);
    var ProdutoDAO = new app.aplication.model.ProdutoDAO_prod();

    ProdutoDAO.excluirProduto(formData, res);
    
}