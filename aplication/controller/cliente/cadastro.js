const validarCpf = require('validar-cpf');

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
        console.log(error);
        res.render("cliente/cadastro", { valid: error, msg: {}, user: {} });
        return;
    }

    if(!validarCpf(formData.cpf)){
        res.render("cliente/cadastro", { valid: [{ param: 'cpf', msg: 'CPF informado é inválido', value: '' }], msg: {}, user: {} });
        return;
    }

    //var conexao = app.dbConfig.database;
    //var ClienteDAO = new app.aplication.model.ClienteDAO(conexao);
    var ClienteDAO = new app.aplication.model.ClienteDAO_prod();

    ClienteDAO.inserirCliente(formData, res);

}