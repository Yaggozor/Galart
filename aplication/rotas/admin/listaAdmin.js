module.exports = (app) => {

    app.get("/admin/listaAdmin", (req, res) => {
        app.aplication.controller.admin.listaAdmin.index(app, req, res);
    });

}