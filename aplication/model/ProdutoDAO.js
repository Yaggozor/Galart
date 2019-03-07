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

module.exports = ()=>{
    return ProdutoDAO;
}