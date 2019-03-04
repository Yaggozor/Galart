const express= require('express');
const consign= require ('consign');

const app= express();

app.set('view engine','ejs');
app.set('views','aplication/views');


consign().include('aplication/rotas').then('aplication/controller').then('aplication/model').into(app);
app.listen(3000,()=>{
    console.log('SOCORRO FUDEU')
});
