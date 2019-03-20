module.exports = (app) => {

    app.post("/admin/exclusaoAdmin", (req, res) => {
        app.aplication.controller.admin.exclusaoAdmin.excluindoAdmin(app, req, res);
    });

}