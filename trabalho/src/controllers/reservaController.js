const Reserva = require("../models/reservaModel");
const moment = require('moment');

function indexView(req, res) {
  res.render("login.html");
}

function homeView(req, res) {
  Reserva.findAll({
    where: {
      id_usuario: req.session.usuario.id,
      indicador_ativo: 1,
    },
  })
    .then((reservas) => {
      reservas.forEach(reserva => {
        reserva.dataValues.data = moment(reserva.data).format('DD/MM/YYYY');
      });
      res.render("home.html", { reservas });
    })
    .catch((erro_recupera_reservas) => {
      res.render("home.html", { erro_recupera_reservas });
    });
}

function cadastrarReserva(req, res) {
  let reserva = {
    nome: req.body.nome,
    data: req.body.data,
    horario: req.body.horario,
    qtd_pessoas: req.body.qtd_pessoas,
    mesa: req.body.mesa,
    id_usuario: req.session.usuario.id,
    indicador_ativo: 1
  };

  Reserva.create(reserva)
    .then(() => {
      let sucesso = true;
      res.render('home.html', { sucesso });
    })
    .catch((err) => {
      console.log(err);
      let erro_cadastrar_reservas = true;
      res.render("home.html", { erro_cadastrar_reservas });
    });
}

async function excluirReserva(req, res) {
  const idReserva = req.params.id; 
  try {
    await Reserva.destroy({
      where: {
        id: idReserva,
      },
    });

    res.redirect('/reservas'); 
  } catch (erro) {
    console.error('Erro ao excluir a reserva:', erro);
    res.status(500).send('Erro ao excluir a reserva.');
  }
}

module.exports = {
  indexView,
  homeView,
  cadastrarReserva,
  excluirReserva,
};
