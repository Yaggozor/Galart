module.exports.index=(app,req,res)=>{

    if (req.session.authorized) {
        res.render('cliente/home', { user: req.session.nome });
    }
    
    res.render('cliente/home', { user: {} });

}