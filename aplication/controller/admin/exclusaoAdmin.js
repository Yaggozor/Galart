module.exports.excluindoAdmin = (app, req, res) => {

    var formData = req.body;

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);

    AdminDAO.excluirAdmin(formData, res);

}