const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    let usuario = {
        nome: 'Luan',
        telefone: 123
    };
    res.render('index.html', {usuario});
});

app.post('/dados', function (req, res) {
    const dadosFormulario = {
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        data: req.body.data
    };

    res.render('dados.html', { dadosFormulario });
});


const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});