const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/dados', function (req, res) {
    const dadosFormulario = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        endereco: req.body.endereco,
        uf: req.body.uf,
        cep: req.body.cep,
        email: req.body.email,
        telefone: req.body.telefone,
        especialidade: req.body.especialidade,
        data_consulta: req.body.data_consulta,
        hora_consulta: req.body.hora_consulta,
        alergias: req.body.alergias,
        informacoes_adicionais: req.body.informacoes_adicionais
    };

    let camposVazios = null;
    for(const key in dadosFormulario) {
        if(!dadosFormulario[key]) {
            camposVazios = key;
            break;
        }
    }
    
    if (camposVazios) {
        res.render('index.html', {erro: `O campo ${camposVazios} deve ser preenchido.`});
    } else {
        res.render('dados.html', {dadosFormulario});
    }
});

const PORT = 8080;
app.listen(PORT, function () {
    console.log('app rodando na porta ' + PORT);
});