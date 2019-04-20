module.exports=(app)=>{

    app.get('/',(req,res)=>{
        app.aplication.controller.cliente.home.index(app,req,res);
    });
    
}