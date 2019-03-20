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

TransacaoDAO.prototype.mostrarTransacao = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("transacoes", function (err, collection) {
            if (data == null) {
                collection.find().toArray(function (err, result) {
                    res.render("admin/historico", { data: result });
                });
            }
        });
        mongoclient.close();
    });
}

module.exports = () => {
    return TransacaoDAO;
}