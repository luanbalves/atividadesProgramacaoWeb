const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const autenticacaoController = require('./src/controllers/autenticacaoController')
const db = require('./src/db')

const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'secret-token',
  name: 'sessionId',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
    res.render('login.html');  
});

app.get('/cadastro', (req, res) => {
    res.render('cadastro.html');
});

app.get('/home', autenticacaoController.verificarAutenticacao, (req, res) => {
  res.render('home.html');
});

app.use('/', require('./src/routes/usuarioRoutes'));
app.use('/', require('./src/routes/autenticacaoRoutes'));
app.use('/', require('./src/routes/reservaRoutes'));

db.sync(() => console.log(`Banco de dados conectado`));

const app_port = 8080;
app.listen(app_port, () => {
  console.log(`App rodando na porta ${app_port}`);
});
