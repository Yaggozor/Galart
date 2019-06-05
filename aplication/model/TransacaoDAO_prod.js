const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

function TransacaoDAO() {}

TransacaoDAO.prototype.inserirTransacao = function (transacao) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('transacoes');

        collection.insertOne(transacao);

        client.close();
    });
}

TransacaoDAO.prototype.mostrarTransacao = function (res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('transacoes');

        collection.find().toArray(function (err, result) {
            res.render("admin/historicoTransacao", { data: result });
        });

        client.close();
    });
}

TransacaoDAO.prototype.mostrarCompra = function (req, res) {
    const url = process.env.MONGODB_URI;
    const dbName = 'galart';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(function (err) {
        //assert.equal(null, err);
        const db = client.db(dbName);
        const collection = db.collection('transacoes');

        collection.find({ email: req.session.email }).toArray(function (err, result) {
            res.render("cliente/historicoCompra", { data: result });
        });

        client.close();
    });
}

module.exports = () => {
    return TransacaoDAO;
}