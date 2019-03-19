module.exports = (app) => {

    app.get("/admin/historico", (req, res) => {
        app.aplication.controller.admin.historico.index(app, req, res);
    });

}