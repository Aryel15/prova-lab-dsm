const express = require('express')
const app = express()
const handlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const { Clientes } = require('./models/cliente')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 8080

app.get('/', (req, res) => {
    Clientes.findAll().then((clientes) => {
        res.render('consulta', { cliente: clientes })
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
})

app.post('/cadastrar', (req, res) => {
    const { nome, endereco, bairro, cep, cidade, estado } = req.body
    Clientes.create({
        nome: nome, 
        endereco: endereco, 
        bairro: bairro, 
        cep: cep, 
        cidade: cidade, 
        estado: estado
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.get('/editar/:id', (req, res) => {
    const { id } = req.params
    Clientes.findAll({ where: { "id": id } }).then((cliente) => {
        res.render('editar', { cliente: cliente })
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.post('/editar/:id', (req, res) => {
    const { nome, endereco, bairro, cep, cidade, estado } = req.body
    const { id } = req.params
    Clientes.update({
        nome: nome, 
        endereco: endereco, 
        bairro: bairro, 
        cep: cep, 
        cidade: cidade, 
        estado: estado
    }, { where: { "id": id } }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.get('/excluir/:id', (req, res) => {
    const { id } = req.params
    Clientes.destroy({ where: { "id": id } }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.error(err)
        res.send('Ocorreu um erro')
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})