module.exports.index = (app, req, res) => {
    res.render("cliente/cadastro", { valid: {}, msg: {} });
}

module.exports.inserindoCliente = (app, req, res) => {

    var formData = req.body;

    req.assert("nome", "Nome não foi definido").notEmpty();
    req.assert("sobrenome", "Sobrenome não foi definido").notEmpty();
    req.assert("email", "E-mail não foi definido").notEmpty();
    req.assert("senha", "Senha não foi definida").notEmpty();
    req.assert("cpf", "CPF não foi definido").notEmpty();
    req.assert("nascimento", "Data de nascimento não foi definida").notEmpty();
    req.assert("ddd", "DDD não foi definido").notEmpty();
    req.assert("telefone", "Telefone não foi definido").notEmpty();

    var error = req.validationErrors();

    if (error) {
        res.render("cliente/cadastro", { valid: error, msg: {} });
        return;
    }

    var conexao = app.dbConfig.database;
    var ClienteDAO = new app.aplication.model.ClienteDAO(conexao);

    ClienteDAO.inserirCliente(formData);

    res.render("cliente/cadastro", { valid: {}, msg: "Cliente cadastrado com sucesso" });
}