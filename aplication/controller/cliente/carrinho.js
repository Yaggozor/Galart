module.exports.index = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var itens = [];
    if (req.session.item !== null) {
        itens = req.session.item;
    }

    res.render("cliente/carrinho", { itens: itens });
}

module.exports.addCarrinho = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var formData = req.body;
    var user = req.session.nome;

    //var conexao = app.dbConfig.database;
    //var ProdutoDAO = new app.aplication.model.ProdutoDAO(conexao);
    var ProdutoDAO = new app.aplication.model.ProdutoDAO_prod();

    ProdutoDAO.addProdutoCarrinho(formData, req, res, user);
}

module.exports.pagamentoBoleto = (app, req, res) => {
    if (req.session.authorized !== true) {
        res.render("componentes/error");
        return;
    }

    var formData = req.body;
    var pagSeguro = app.pagSeguroConfig.pagSeguro;

    var data = req.session.nascimento.split("-");

    data = new Date(data[2], data[1], data[0]);
    var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear(); 
    
    pagSeguro.setSender({
        name: req.session.nomecompleto,
        email: req.session.email,
        cpf_cnpj: req.session.cpf,
        area_code: req.session.ddd,
        phone: req.session.telefone,
        birth_date: dataFormatada //formato dd/mm/yyyy
    });

    pagSeguro.setShipping({
        street: formData.endereco,
        number: formData.numeroendereco,
        district: formData.bairro,
        city: formData.cidade,
        state: formData.estado,
        postal_code: formData.cpf,
        same_for_billing: true
    });

    var itens = req.session.item;
    // colocar em loop
    for(var i=0; i < itens.length; i++){
        pagSeguro.addItem({
            qtde: 1,
            value: parseFloat(itens[i].preco),
            description: itens[i].nome
        });
    }

    pagSeguro.sessionId(function (err, session_id) {
        //console.log(session_id);
    });

    pagSeguro.sendTransaction({
        method: "boleto", //'boleto' ou 'creditCard'
        value: formData.total,
        installments: 1, //opcional, padrão 1
        //hash: String //senderHash gerado pela biblioteca do PagSeguro
    }, function (err, data) {
        //console.log(data);
    });

    const order = {
        name: req.session.nomecompleto,
        email: req.session.email,
        cpf_cnpj: req.session.cpf,
        area_code: req.session.ddd,
        phone: req.session.telefone,
        street: formData.endereco,
        number: formData.numeroendereco,
        district: formData.bairro,
        city: formData.cidade,
        state: formData.estado,
        postal_code: formData.cep,
        itens: itens,
        method: "boleto",
        value: formData.total
    }

    //var conexao = app.dbConfig.database;
    //var TransacaoDAO = new app.aplication.model.TransacaoDAO(conexao);
    var TransacaoDAO = new app.aplication.model.TransacaoDAO_prod();

    TransacaoDAO.inserirTransacao(order);
    
    res.render("cliente/compraFinalizada");
}