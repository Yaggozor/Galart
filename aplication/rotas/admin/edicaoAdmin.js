module.exports = (app) => {

    app.post("/admin/edicaoAdmin", (req, res) => {
        app.aplication.controller.admin.edicaoAdmin.index(app, req, res);
    });

    app.post("/admin/adminEditado", (req, res) => {
        app.aplication.controller.admin.edicaoAdmin.editandoAdmin(app, req, res);
    });

}