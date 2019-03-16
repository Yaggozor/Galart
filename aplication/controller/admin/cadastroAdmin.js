module.exports.index = (app, req, res) => {
    res.render("admin/cadastroAdmin");
}

module.exports.inserindoAdmin = (app, req, res) => {

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);

    AdminDAO.inserirAdmin(formData);

    res.render("admin/cadastroAdmin");
}