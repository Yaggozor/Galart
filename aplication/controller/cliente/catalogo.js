module.exports.index = (app, req, res)=>{
    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);
    
    var admin = null;
    var user = null;
    var formData = null;

    if (req.session.authorized) {
        user = req.session.nome;
    }

    ProdutoDAO.mostrarProduto(formData, res, admin, user);
}