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

ProdutoDAO.prototype.mostrarProduto = function(data, res, admin, user){
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            if(admin !== null){
                if(data == null){
                    collection.find().toArray(function (err, result) {
                        res.render("admin/listaProdutos", { data: result, user: {} });
                    });
                } else {
                    collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                        res.render("admin/edicaoProduto", { data: result, user: {} });
                    });
                }
            }else{
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
        });
        mongoclient.close();
    });
}

ProdutoDAO.prototype.filtrarProduto = function (data, res, admin, user) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            var nome = new RegExp(data.busca, 'i');
            var tipo = data.categoria;

            if (tipo === "Todas") {
                collection.find({ nome : nome }).toArray(function (err, result) {
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
                res.render("admin/listaProdutos", { data: result, user: {} });
            });
        });
        mongoclient.close();
    });
}

ProdutoDAO.prototype.addProdutoCarrinho = function (data, req, res, user) {
    this._conexao.open(function (err, mongoclient) {
        mongoclient.collection("produtos", function (err, collection) {
            collection.find({ _id: ObjectID(data._id) }).toArray(function (err, result) {
                
                req.session.item.push(result[0]);
                
                res.render("cliente/arteDetalhe", { data: result, user: user, msg: "Item adicionado ao carrinho!" });
            });
        });
        mongoclient.close();
    });
}

module.exports = ()=>{
    return ProdutoDAO;
}