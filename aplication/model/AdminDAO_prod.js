const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectID = require("mongodb").ObjectId;
var crypto = require("crypto");

function AdminDAO() {}

AdminDAO.prototype.autenticar = function (user, req, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('admins');
        
        var senha_criptografada = crypto.createHash("md5").update(user.senhaadmin).digest("hex");
        user.senhaadmin = senha_criptografada;

        collection.find(user).toArray(function (err, result) {
            if (result[0] == undefined) {
                res.render("admin/loginAdmin", { valid: {}, msg: "Senha e/ou login desconhecidos" });
            } else {
                if (result[0].senhaadmin === user.senhaadmin) {
                    req.session.authorized = true;

                    req.session.nomeadmin = result[0].nomeadmin;

                    res.redirect("admin/listaProdutos");
                }
            }
        });

        client.close();
    });
}


/*AdminDAO.prototype.inserirAdmin = function (usuario) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {

            var senha_criptografada = crypto.createHash("md5").update(usuario.senhaadmin).digest("hex");
            usuario.senhaadmin = senha_criptografada;
            
            collection.insertOne(usuario);
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

AdminDAO.prototype.autenticar = function (user, req, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("admins", function (err, collection) {
            
            var senha_criptografada = crypto.createHash("md5").update(user.senhaadmin).digest("hex");
            user.senhaadmin = senha_criptografada;
            
            collection.find(user).toArray(function (err, result) {
                if(result[0] == undefined){
                    res.render("admin/loginAdmin", { valid: {}, msg: "Senha e/ou login desconhecidos" });
                } else {
                    if (result[0].senhaadmin === user.senhaadmin) {
                        req.session.authorized = true;

                        req.session.nomeadmin = result[0].nomeadmin;

                        res.redirect("admin/listaProdutos");
                    }
                }
            });
        });
        mongoclient.close();
    });
}*/

module.exports = () => {
    return AdminDAO;
}