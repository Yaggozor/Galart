module.exports = (app)=>{

    app.get("/admin/edicaoProduto", (req, res)=>{
        app.aplication.controller.admin.edicaoProduto.index(app, req, res);
    });

}