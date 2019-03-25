module.exports.index = (app, req, res) => {
    res.render("admin/cadastroAdmin", { valid: {}, msg: {} });
}

module.exports.inserindoAdmin = (app, req, res) => {

    var formData = req.body;

    req.assert("nomeadmin", "Nome do(a) administrador(a) não foi definido").notEmpty();
    req.assert("emailadmin", "E-mail não foi definido").notEmpty();
    req.assert("senhaadmin", "Senha não foi definida").notEmpty();
    req.assert("confirmasenhaadmin", "Confirmação de senha não foi definida").notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("admin/cadastroAdmin", { valid: error, msg: {} });
        return;
    }

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);

    AdminDAO.inserirAdmin(formData);

    res.render("admin/cadastroAdmin", { valid: {}, msg: "Novo Administrador cadastrado com sucesso" });
}