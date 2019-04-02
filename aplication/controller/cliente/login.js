module.exports.index = (app, req, res) => {
    res.render("cliente/login", { valid: {}, msg: {} });
}

module.exports.autenticacao = (app, req, res) => {

    var formData = req.body;

    req.assert("email", "E-mail não foi preenchido").notEmpty();
    req.assert("senha", "Senha não foi preenchida").notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("cliente/login", { valid: error, msg: {} });
    }

    var conexao = app.dbConfig.database;
    var ClienteDAO = new app.aplication.model.ClienteDAO(conexao);

    ClienteDAO.autenticar(formData, req, res);
}

module.exports.sair = (app, req, res) => {
    req.session.destroy(function (err) {
        res.render("cliente/login", { valid: {}, msg: {} });
    });
}