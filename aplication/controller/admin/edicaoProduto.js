module.exports.index = (app, req, res)=>{
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var admin = req.session.nomeadmin;
    var formData = req.body;

    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.mostrarProduto(formData, res, admin);

}

module.exports.editandoProduto = (app, req, res)=>{

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.atualizarProduto(formData);

    var data = [formData];
    res.render("admin/edicaoProduto", { data: data });

}