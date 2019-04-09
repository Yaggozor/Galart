module.exports.index = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var conexao = app.dbConfig.database;
    var ClienteDAO = new app.aplication.model.ClienteDAO(conexao);

    var formData = null
    var id = req.session._id;

    ClienteDAO.mostrarCliente(id, res, formData);
}

module.exports.editarPerfil = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var conexao = app.dbConfig.database;
    var ClienteDAO = new app.aplication.model.ClienteDAO(conexao);

    var formData = req.body;
    var id = req.session._id;

    if (formData.editar === "editando") {
        ClienteDAO.atualizarCliente(formData);
        res.redirect("/perfil");
        return;
    }

    ClienteDAO.mostrarCliente(id, res, formData);
}