var ObjectID = require("mongodb").ObjectId;

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

ProdutoDAO.prototype.mostrarProduto = function(data, res){
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            if(data == null){
                collection.find().toArray(function (err, result) {
                    res.render("admin/listaProdutos", { data: result });
                });
            }else{
                collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                    res.render("admin/edicaoProduto", { data: result });
                });
            }
        });
        mongoclient.close();
    });
}

ProdutoDAO.prototype.atualizarProduto = function (data) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            console.log(data);
            collection.replaceOne(
                { _id: ObjectID(data._id) },
                {
                    nome: data.nome,
                    tipo: data.tipo,
                    foto: data.foto,
                    tamanho: data.tamanho,
                    preco: data.preco,
                    descricao: data.descricao
                }
            );
        });
        mongoclient.close();
    });
}

module.exports = ()=>{
    return ProdutoDAO;
}