const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectID = require("mongodb").ObjectId;
var crypto = require("crypto");

function ClienteDAO() {}

ClienteDAO.prototype.inserirCliente = function (cliente, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('clientes');
    
        var senha_criptografada = crypto.createHash("md5").update(cliente.senha).digest("hex");
        cliente.senha = senha_criptografada;

        collection.insertOne(cliente, function (err, result) {
            if (result) {
                res.render("cliente/cadastro", { valid: {}, msg: "Cliente cadastrado com sucesso", user: {} });
            }
            else {
                res.render("cliente/cadastro", { valid: "Problemas ao cadastrar cliente", msg: {}, user: {} });
            }
        });

        client.close();
    });
}

ClienteDAO.prototype.mostrarCliente = function (user, res, data) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('clientes');
    
        if (data == null) {
            collection.find({ _id: ObjectID(user) }).toArray(function (err, result) {
                res.render("cliente/perfil", { data: result });
            });
        } else {
            collection.find({ _id: ObjectID(user) }).toArray(function (err, result) {
                res.render("cliente/editarPerfil", { data: result });
            });
        }

        client.close();
    });
}

ClienteDAO.prototype.atualizarCliente = function (data) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('clientes');
        
        collection.updateOne(
            { _id: ObjectID(data._id) },
            {
                $set: {
                    nome: data.nome,
                    sobrenome: data.sobrenome,
                    email: data.email,
                    senha: data.senha,
                    cpf: data.cpf,
                    nascimento: data.nascimento,
                    sexo: data.sexo,
                    ddd: data.ddd,
                    telefone: data.telefone
                }
            }
        );
        
        client.close();
    });
}

ClienteDAO.prototype.excluirCliente = function (data, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('clientes');
        
        collection.deleteOne({ _id: ObjectID(data._id) });

        collection.find().toArray(function (err, result) {
            res.render("admin/listaAdmin", { data: result });
        });
        
        client.close();
    });
}

ClienteDAO.prototype.autenticar = function (user, req, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('clientes');
        
        var senha_criptografada = crypto.createHash("md5").update(user.senha).digest("hex");
        user.senha = senha_criptografada;

        collection.find(user).toArray(function (err, result) {
            if (result[0] != undefined) {
                req.session.authorized = true;

                req.session.nome = result[0].nome;
                req.session.sobrenome = result[0].sobrenome;
                req.session.nomecompleto = result[0].nome + " " + result[0].sobrenome;
                req.session.email = result[0].email;
                req.session.cpf = result[0].cpf;
                req.session.ddd = result[0].ddd;
                req.session.telefone = result[0].telefone;
                req.session.nascimento = result[0].nascimento;
                req.session._id = result[0]._id;
                req.session.item = [];
            }
            if (req.session.authorized) {
                res.redirect("/catalogo");
            }
            else {
                res.render("cliente/login", { valid: {}, msg: "Senha e/ou login desconhecidos" });
            }
        });
        
        client.close();
    });
}

/*ClienteDAO.prototype.inserirCliente = function (cliente) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {

            var senha_criptografada = crypto.createHash("md5").update(cliente.senha).digest("hex");
            cliente.senha = senha_criptografada;

            collection.insertOne(cliente);
        });
        mongoclient.close();
    });
}

ClienteDAO.prototype.mostrarCliente = function (user, res, data) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("clientes", function (err, collection) {
            if (data == null) {
                collection.find({ _id: ObjectID(user) }).toArray(function (err, result) {
                    res.render("cliente/perfil", { data: result });
                });
            } else {
                collection.find({ _id: ObjectID(user) }).toArray(function (err, result) {
                    res.render("cliente/editarPerfil", { data: result });
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
                    sobrenome: data.sobrenome,
                    email: data.email,
                    senha: data.senha,
                    cpf: data.cpf,
                    nascimento: data.nascimento,
                    sexo: data.sexo,
                    ddd: data.ddd,
                    telefone: data.telefone
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

            var senha_criptografada = crypto.createHash("md5").update(user.senha).digest("hex");
            user.senha = senha_criptografada;

            collection.find(user).toArray(function (err, result) {
                if (result[0] != undefined) {
                    req.session.authorized = true;
                    
                    req.session.nome = result[0].nome;
                    req.session.sobrenome = result[0].sobrenome;
                    req.session.nomecompleto = result[0].nome + " " + result[0].sobrenome;
                    req.session.email = result[0].email;
                    req.session.cpf = result[0].cpf;
                    req.session.ddd = result[0].ddd;
                    req.session.telefone = result[0].telefone;
                    req.session.nascimento = result[0].nascimento;
                    req.session._id = result[0]._id;
                    req.session.item = [];
                }
                if (req.session.authorized) {
                    res.redirect("/catalogo");
                }
                else {
                    res.render("cliente/login", { valid: {}, msg: "Senha e/ou login desconhecidos" });
                }

            });
        });
        mongoclient.close();
    });
}*/

module.exports = () => {
    return ClienteDAO;
}