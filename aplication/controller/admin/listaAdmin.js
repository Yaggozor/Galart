module.exports.index = (app, req, res) => {

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);
    var data = null;

    AdminDAO.mostrarAdmin(data, res);

}