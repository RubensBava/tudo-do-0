const express = require('express')
var mongoose = require('mongoose')
var Produtos = require('./models/produto');
const app = express()
const port = 3000



var url = 'mongodb+srv://Rubinho:123@cluster0.5na6m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true
};


mongoose.connect(url, options)

mongoose.connection.on('error', (erro) => {
    console.log('Erro ao conectar com o banco de dados: ' + erro)
})


mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!!')
})


app.use(express.json());




app.get('/', (req, res) => {
    console.log('Opa! site acessado')
    res.send('Opa! entendi!!')

})
//res.send('') é uma resposta de de uma ação que o usuario fez,no meu caso eu abri o servidor e o res.send me respondeu com opa entendi
    //console.log('') é uma aprensentação atrás do site,(terminal) onde mostra onde a pessoa acessou ou deu f5 

//R - Read para ler 
app.get('/outro', (req, res) => {
    console.log('Opa,site outro acessado')
    res.send('Opa! bom dia tarde ou noite!!')

})

//C - Create para criar
app.post('/outracoisa', (req, res) => {
    console.log('Opa,site outracoisa acessado')
    res.send('Opa! agora abriu na url em outro diretorio')

})
    

app.post('/produtos', (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Incluir um produto'


    Produtos.create(req.body, (erro, data) => {
        if (erro) {
            console.log('Erro a salvar o produto: ' + erro)
            res.status(500).send('Erro a salvar o produto: ' + erro)
        }
        else {
            console.log('Produto cadastrado com sucesso!!! ' + data)
            res.status(201).send('Produto cadastrado com sucesso!!!')
        }
    })
})


app.get('/produtos/:codigo', (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Buscar um produto'
    res.status(200).send('Tudo ok com o método para buscar o produto! ' + req.params.codigo)
})

app.get('/produtos', (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Listar produtos'
    console.log(req.query)
    res.status(200).send('Tudo ok com o método para listar o produtos! ' + req.query.nome)
})

//U - Update
app.put('/produtos/:codigo', (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Alterar um produto'
    console.log(req.body)
    res.status(200).send('Tudo ok com o método para alterar o produto! ' + req.params.codigo)
})

//D - Delete
app.delete('/produtos/:codigo', (req, res) => {
    // #swagger.tags = ['Produtos']   
    // #swagger.description = 'Excluir um produto'
    res.status(200).send('Tudo ok com o método para excluir o produto! ' + req.params.codigo)
})

















app.listen(port, () => {
    console.log('Servidor web ok!')
})





