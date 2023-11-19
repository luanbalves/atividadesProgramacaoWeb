const express = require('express');
const router = express.Router();

const reservaController = require('../controllers/reservaController');

router.post('/submit_reserva', reservaController.criarReserva);

module.exports = router;
