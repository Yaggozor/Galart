module.exports = (app)=>{

    app.post("/admin/edicaoProduto", (req, res)=>{
        app.aplication.controller.admin.edicaoProduto.index(app, req, res);
    });

    app.post("/admin/produtoEditado", (req, res) => {
        app.aplication.controller.admin.edicaoProduto.editandoProduto(app, req, res);
    });

}