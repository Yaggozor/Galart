module.exports.index = (app, req, res)=>{
    res.render("admin/cadastroProduto");
}

module.exports.inserindoProduto = (app, req, res)=>{

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.inserirProduto(formData);
    
    res.render("admin/cadastroProduto");
}