const mongo = require("mongodb");

const dbProduto = ()=>{
    const db = new mongo.Db(
        "produtos",                                 // nome da base de dados de produtos
        new mongo.Server("localhost", 27017, {}),   // objeto de conexão com a base
        {}                                          // objeto de configurações adicionais
    );
    return db;
}

module.exports = ()=>{
    return dbProduto;
}