module.exports = (app) => {

    app.get("/galart-login-admin", (req, res) => {
        app.aplication.controller.admin.loginAdmin.index(app, req, res);
    });

}