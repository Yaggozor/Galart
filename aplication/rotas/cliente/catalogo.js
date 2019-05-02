module.exports = (app)=>{

    app.get("/catalogo", (req, res)=>{
        app.aplication.controller.cliente.catalogo.index(app, req, res);
    });

    app.post("/catalogo", (req, res) => {
        app.aplication.controller.cliente.catalogo.filtrarProduto(app, req, res);
    });
    
}