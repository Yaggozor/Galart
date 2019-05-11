function TransacaoDAO(conexao) {
    this._conexao = conexao();
}

TransacaoDAO.prototype.inserirTransacao = function (transacao) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("transacoes", function (err, collection) {
            collection.insertOne(transacao);
        });
        mongoclient.close();
    });
}

TransacaoDAO.prototype.mostrarTransacao = function (res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("transacoes", function (err, collection) {
            collection.find().toArray(function (err, result) {
                res.render("admin/historicoTransacao", { data: result });
            });
        });
        mongoclient.close();
    });
}

TransacaoDAO.prototype.mostrarCompra = function (req, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("transacoes", function (err, collection) {
            collection.find({ email : req.session.email }).toArray(function (err, result) {
                res.render("cliente/historicoCompra", { data: result });
            });
        });
        mongoclient.close();
    });
}

module.exports = () => {
    return TransacaoDAO;
}