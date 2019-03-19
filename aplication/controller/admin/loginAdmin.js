module.exports.index = (app, req, res) => {
    res.render("admin/loginAdmin", { valid: {}, msg: {} });
}