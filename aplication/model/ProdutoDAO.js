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

ProdutoDAO.prototype.mostrarProduto = function(data, res, admin){
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            if(admin !== null){
                if(data == null){
                    collection.find().toArray(function (err, result) {
                        res.render("admin/listaProdutos", { data: result });
                    });
                }else{
                    collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                        res.render("admin/edicaoProduto", { data: result });
                    });
                }
            }else{
                if (data == null) {
                    collection.find().toArray(function (err, result) {
                        res.render("cliente/catalogo", { data: result });
                    });
                } else {
                    collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                        res.render("cliente/arteDetalhe", { data: result });
                    });
                }
            }
        });
        mongoclient.close();
    });
}

ProdutoDAO.prototype.atualizarProduto = function (data) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
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

ProdutoDAO.prototype.excluirProduto = function (data, res) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            collection.deleteOne({ _id: ObjectID(data._id) });
            
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