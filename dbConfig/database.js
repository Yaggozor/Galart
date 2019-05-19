const mongo = require("mongodb");

const dbGalart = ()=>{
    const db = new mongo.Db(
        "galart",                                   // nome da base de dados de produtos
        new mongo.Server(process.env.MONGODB_URI, 27017, {}),   // objeto de conexão com a base
        {}                                          // objeto de configurações adicionais
    );
    return db;
}

module.exports = ()=>{
    return dbGalart;
}