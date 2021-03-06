const express= require('express');
const consign= require ('consign');
const bodyparser= require('body-parser');
const expressValidator = require("express-validator");
const expressSession = require("express-session");

require("dotenv").config();

const app= express();

app.set('view engine','ejs');
app.set('views','aplication/views');

app.use(express.static("./aplication/public"));
app.use(bodyparser.urlencoded({ extended : true }));
app.use(expressValidator());
app.use(expressSession({
    secret: "mnbvcxzasdfghjklçpoiuytrewq",
    resave: false,
    saveUninitialized: false
}));

consign()
    .include('aplication/rotas')
    .then('aplication/controller')
    .then('aplication/model')
    .then("dbConfig/database.js")
    .then("pagSeguroConfig/pagSeguro.js")
    .into(app);

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log('Agora vai')
});
