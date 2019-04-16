var PagSeguro = require('node-pagseguro');

/* DESCOMENTAR PARA HABILITAR PRODUÇÃO
var payment = new PagSeguro({
    email: 'jefferson.g.silva@hotmail.com',
    token: '7d6fb9f1-b2f2-4980-b6b5-d61cace5f2debe6c44144a3189b5d1cfd7bf28a0c2a7fef3-7cbb-4ef7-8f15-b9e0316592ce',
    currency: '' //opcional - default BRL
});
*/

var payment = new PagSeguro({
    email: 'jefferson.g.silva@hotmail.com',
    token: '7d6fb9f1-b2f2-4980-b6b5-d61cace5f2debe6c44144a3189b5d1cfd7bf28a0c2a7fef3-7cbb-4ef7-8f15-b9e0316592ce',
    sandbox: true,
    sandbox_email: '123123123123123@sandbox.pagseguro.com.br'
});

module.exports = ()=>{
    return payment;
}