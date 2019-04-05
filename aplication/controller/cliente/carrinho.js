module.exports.index = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var itens = [];
    if (req.session.item !== null) {
        itens = req.session.item;
    }

    res.render("cliente/carrinho", { itens: itens });
}

module.exports.addCarrinho = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var formData = req.body;
    var user = req.session.nome;

    var conexao = app.dbConfig.database;
    var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);

    ProdutoDAO.addProdutoCarrinho(formData, req, res, user);
}