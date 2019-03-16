module.exports=(app)=>{

    app.get('/Home2',(req,res)=>{
        app.aplication.controller.cliente.Home2.index(app,req,res);
    })
}