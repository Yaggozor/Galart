module.exports = (app)=>{

    app.get("/catalogo", (req, res)=>{
        app.aplication.controller.cliente.catalogo.index(app, req, res);
    });
    
}