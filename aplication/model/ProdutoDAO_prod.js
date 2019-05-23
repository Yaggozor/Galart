const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectID = require("mongodb").ObjectId;

function ProdutoDAO() {}

ProdutoDAO.prototype.inserirProduto = function (produto, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });
    
    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');
        
        collection.insertOne(produto, function (err, result) {
            //assert.equal(err, null);
            if(result){
                res.render("admin/cadastroProduto", { valid: {}, msg: "Arte cadastrada com sucesso" });
            }
            else{
                res.render("admin/cadastroProduto", { valid: "Problema no cadastro da Arte", msg: {} });
            }
        });

        client.close();
    });
}

ProdutoDAO.prototype.mostrarProduto = function (data, res, admin, user) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');

        if (admin !== null) {
            if (data == null) {
                collection.find().toArray(function (err, result) {
                    res.render("admin/listaProdutos", { data: result, user: {} });
                });
            } else {
                collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                    res.render("admin/edicaoProduto", { data: result, user: {} });
                });
            }
        } else {
            if (data == null) {
                collection.find().toArray(function (err, result) {
                    res.render("cliente/catalogo", { data: result, user: user });
                });
            } else {
                collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                    res.render("cliente/arteDetalhe", { data: result, user: user, msg: {} });
                });
            }
        }

        client.close();
    });
}

ProdutoDAO.prototype.filtrarProduto = function (data, res, admin, user) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');

        var nome = new RegExp(data.busca, 'i');
        var tipo = data.categoria;

        if (tipo === "Todas") {
            collection.find({ nome: nome }).toArray(function (err, result) {
                res.render("cliente/catalogo", { data: result, user: user });
            });
        } else {
            collection.find({

                $and: [
                    { nome: nome },
                    { tipo: tipo }
                ]

            }).toArray(function (err, result) {
                res.render("cliente/catalogo", { data: result, user: user });
            });
        }

        client.close();
    });
}

ProdutoDAO.prototype.atualizarProduto = function (data) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');

        collection.updateOne(
            { _id: ObjectID(data._id) },
            {
                $set: {
                    nome: data.nome,
                    tipo: data.tipo,
                    foto: data.foto,
                    tamanho: data.tamanho,
                    preco: data.preco,
                    descricao: data.descricao
                }
            }
        );

        client.close();
    });
}

ProdutoDAO.prototype.excluirProduto = function (data, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');

        collection.deleteOne(data, function (err, result) {
            //assert.equal(err, null);
            res.render("admin/listaProdutos", { data: result, user: {} });
        });

        client.close();
    });
}

ProdutoDAO.prototype.addProdutoCarrinho = function (data, res, admin, user) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('produtos');

        collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
            req.session.item.push(result[0]);
            res.render("cliente/arteDetalhe", { data: result, user: user, msg: "Item adicionado ao carrinho!" });
        });

        client.close();
    });
}

module.exports = () => {
    return ProdutoDAO;
}