module.exports = (app)=>{

    app.get("/listaProdutos", (req, res)=>{
        app.aplication.controller.cliente.listaProdutos.index(app, req, res);
    });
    
}