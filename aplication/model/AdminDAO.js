var ObjectID = require("mongodb").ObjectId;

function AdminDAO(conexao) {
    this._conexao = conexao();
}

AdminDAO.prototype.inserirAdmin = function (produto) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {
            collection.insertOne(produto);
        });
        mongoclient.close();
    });
}

AdminDAO.prototype.mostrarAdmin = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {
            if (data == null) {
                collection.find().toArray(function (err, result) {
                    res.render("admin/listaAdmin", { data: result });
                });
            } else {
                collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                    res.render("admin/edicaoAdmin", { data: result });
                });
            }
        });
        mongoclient.close();
    });
}

AdminDAO.prototype.atualizarAdmin = function (data) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {
            collection.replaceOne(
                { _id: ObjectID(data._id) },
                {
                    nomeadmin: data.nomeadmin,
                    emailadmin: data.emailadmin,
                    senhaadmin: data.senhaadmin
                }
            );
        });
        mongoclient.close();
    });
}

AdminDAO.prototype.excluirAdmin = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {
            collection.deleteOne({ _id: ObjectID(data._id) });

            collection.find().toArray(function (err, result) {
                res.render("admin/listaAdmin", { data: result });
            });
        });
        mongoclient.close();
    });
}

module.exports = () => {
    return AdminDAO;
}