module.exports = (app)=>{

    app.get("/admin/listaProdutos", (req, res)=>{
        app.aplication.controller.admin.listaProdutos.index(app, req, res);
    });
    
}