var ObjectID = require("mongodb").ObjectId;

function ClienteDAO(conexao) {
    this._conexao = conexao();
}

ClienteDAO.prototype.inserirCliente = function (cliente) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.insertOne(cliente);
        });
        mongoclient.close();
    });
}

ClienteDAO.prototype.mostrarCliente = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            if (data == null) {
                collection.find().toArray(function (err, result) {
                    res.render("cliente/listaCliente", { data: result });
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

ClienteDAO.prototype.atualizarCliente = function (data) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.replaceOne(
                { _id: ObjectID(data._id) },
                {
                    nome: data.nome,
                    email: data.email,
                    senha: data.senha
                }
            );
        });
        mongoclient.close();
    });
}

ClienteDAO.prototype.excluirCliente = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.deleteOne({ _id: ObjectID(data._id) });

            collection.find().toArray(function (err, result) {
                res.render("admin/listaAdmin", { data: result });
            });
        });
        mongoclient.close();
    });
}

ClienteDAO.prototype.autenticar = function (user, req, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            collection.find(user).toArray(function (err, result) {
                if (result[0] != undefined) {
                    req.session.authorized = true;

                    req.session.nome = result[0].nome;
                }
                if (req.session.authorized) {
                    res.redirect("/catalogo");
                }
                else {
                    res.render("cliente/login", { valid: {}, msg: {} });
                }

            });
        });
        mongoclient.close();
    });
}

module.exports = () => {
    return ClienteDAO;
}