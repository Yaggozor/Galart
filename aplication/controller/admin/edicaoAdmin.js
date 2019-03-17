module.exports.index = (app, req, res) => {

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);

    AdminDAO.mostrarAdmin(formData, res);

}

module.exports.editandoAdmin = (app, req, res) => {

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);
    
    AdminDAO.atualizarAdmin(formData);

    var data = [formData];
    res.render("admin/edicaoAdmin", { data: data });

}