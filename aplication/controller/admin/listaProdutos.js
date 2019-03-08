module.exports.index = (app, req, res)=>{
    
    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.mostrarProduto(res);
    // res.render("admin/listaProdutos", { data: {} });

}