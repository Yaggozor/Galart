function ProdutoDAO(conexao){
    this._conexao = conexao();
}

ProdutoDAO.prototype.inserirProduto = function(produto){
    this._conexao.open(function(err, mongoclient){
        mongoclient.collection("produtos", function(err, collection){
            collection.insertOne(produto);
        });
        mongoclient.close();
    });
}

ProdutoDAO.prototype.mostrarProduto = function(res){
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            collection.find().toArray(function (err, result) {
                res.render("admin/listaProdutos", { data: result });
            });
        });
        mongoclient.close();
    });
}

module.exports = ()=>{
    return ProdutoDAO;
}