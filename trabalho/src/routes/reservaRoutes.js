const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reservaController');
const autenticacaoController = require('../controllers/autenticacaoController');

router.get('/', reservaController.indexView);
router.get('/home', autenticacaoController.verificarAutenticacao, reservaController.homeView);
router.post('/submit_reserva', autenticacaoController.verificarAutenticacao, reservaController.cadastrarReserva);
router.post('/excluir_reserva/:id', autenticacaoController.verificarAutenticacao, reservaController.excluirReserva);
router.get('/editar_reserva/:id', reservaController.editarReservaView);
router.post('/atualizar_reserva/:id', reservaController.atualizarReserva);

module.exports = router;
