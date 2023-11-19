const Reserva = require('../models/reservaModel');

async function criarReserva(req, res) {
  const novaReserva = {
    nome: req.body.nome,
    data: req.body.data,
    horario: req.body.horario,
    qtd_pessoas: req.body.qtd_pessoas,
    mesa: req.body.mesa,
  };

  try {
    const reservaExistente = await Reserva.findOne({
      where: {
        data: novaReserva.data,
        horario: novaReserva.horario,
        qtd_pessoas: novaReserva.qtd_pessoas,
        mesa: novaReserva.mesa,
      },
    });

    if (reservaExistente) {
      let reservaDuplicada = true;
      return res.render('home.html', { reservaDuplicada });
    }

    await Reserva.create(novaReserva);
    let sucesso = true;
    res.render('home.html', { sucesso });
  } catch (err) {
    console.error(err);
    let erro = true;
    res.render('home.html', { erro });
  }
}

module.exports = {
  criarReserva,
};
