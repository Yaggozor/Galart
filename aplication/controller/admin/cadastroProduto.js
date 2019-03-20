module.exports.index = (app, req, res)=>{
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }
    res.render("admin/cadastroProduto", { valid: {}, msg: {} });
}

module.exports.inserindoProduto = (app, req, res)=>{

    var formData = req.body;

    req.assert("nome", "Nome da arte não foi definida").notEmpty();
    req.assert("tipo", "Tipo da arte não foi definido").notEmpty();
    req.assert("foto", "Imagem não foi definida").notEmpty();
    req.assert("tamanho", "Tamanho da arte não foi definida").notEmpty();
    req.assert("preco", "Valor do preço não foi definida").notEmpty();
    req.assert("descricao", "Descrição não foi definida").notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("admin/cadastroProduto", { valid: error, msg: {} });
        return;
    }

    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.inserirProduto(formData);
    
    res.render("admin/cadastroProduto", { valid: {}, msg: "Arte cadastrada com sucesso" });
}