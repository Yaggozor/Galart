module.exports.index = (app, req, res) => {
    res.render("admin/loginAdmin", { valid: {}, msg: {} });
}

module.exports.autenticacao = (app, req, res) => {

    var formData = req.body;

    req.assert("emailadmin", "E-mail não foi preenchido").notEmpty();
    req.assert("senhaadmin", "Senha não foi preenchida").notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("admin/loginAdmin", { valid: error, msg: {} });
    }

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);

    AdminDAO.autenticar(formData, req, res);
}

module.exports.sair = (app, req, res) => {
    req.session.destroy(function (err) {
        res.render("admin/loginAdmin", { valid: {}, msg: {} });
    });
}