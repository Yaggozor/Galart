module.exports = (app) => {

    app.get("/admin/cadastroAdmin", (req, res) => {
        app.aplication.controller.admin.cadastroAdmin.index(app, req, res);
    });

    app.post("/admin/cadastroAdmin", (req, res) => {
        app.aplication.controller.admin.cadastroAdmin.inserindoAdmin(app, req, res);
    });

}