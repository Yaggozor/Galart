module.exports.index = (app, req, res)=>{
    
    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);
    var data = null;
    
    ProdutoDAO.mostrarProduto(data, res);

}