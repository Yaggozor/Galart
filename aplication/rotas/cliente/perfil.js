module.exports = (app) => {

    app.get("/perfil", (req, res) => {
        app.aplication.controller.cliente.perfil.index(app, req, res);
    });

    app.post("/editarPerfil", (req, res) => {
        app.aplication.controller.cliente.perfil.editarPerfil(app, req, res);
    });

}