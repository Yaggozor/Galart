module.exports.index = (app, req, res) => {
    
    if (req.session.authorized) {
        res.render('cliente/pedidos', { user: req.session.nome });
        return
    }

    res.render("cliente/pedidos", { user: {} });

}