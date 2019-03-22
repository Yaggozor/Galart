module.exports = (app) => {

    app.get("/error", (req, res) => {
        app.aplication.controller.admin.error.index(app, req, res);
    });

}