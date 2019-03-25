module.exports.index = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var conexao = app.dbConfig.database;
    var AdminDAO = new app.aplication.model.AdminDAO(conexao);
    var data = null;

    AdminDAO.mostrarAdmin(data, res);

}