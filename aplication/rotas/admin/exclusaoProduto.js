module.exports = (app) => {

    app.post("/admin/exclusaoProduto", (req, res) => {
        app.aplication.controller.admin.exclusaoProdutos.excluindoProduto(app, req, res);
    });

}