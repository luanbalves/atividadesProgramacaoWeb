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

function editarReservaView(req, res) {
  res.render('editar_reserva.html', { reservaId: req.params.id });
}

async function atualizarReserva(req, res) {
  const reservaId = req.params.id;

  try {
    console.log('Chegou na função atualizarReserva. ID da Reserva:', reservaId);

    const reservaAtual = await Reserva.findOne({ where: { id: reservaId } });

    if (!reservaAtual) {
      console.error('Reserva não encontrada.');
      res.status(404).send('Reserva não encontrada.');
      return;
    }

    const dadosAtualizados = {
      nome: req.body.nome,
      data: req.body.data,
      horario: req.body.horario,
      mesa: req.body.mesa,
      qtd_pessoas: req.body.qtd_pessoas,
    };

    console.log('Dados atuais da reserva:', reservaAtual.dataValues);
    console.log('Dados atualizados:', dadosAtualizados);

    const dadosDiferentes = Object.keys(dadosAtualizados).some(
      (chave) => reservaAtual[chave] !== dadosAtualizados[chave]
    );

    if (!dadosDiferentes) {
      console.log('Nenhum dado foi alterado.');
      res.redirect('/reservas');
      return;
    }

    const updateResult = await Reserva.update(dadosAtualizados, {
      where: { id: reservaId },
    });

    console.log('Resultado do update:', updateResult);

    const reservaAtualizada = await Reserva.findOne({ where: { id: reservaId } });
    console.log('Dados da reserva após a atualização:', reservaAtualizada.dataValues);

    res.redirect('/reservas');
  } catch (erro_atualizar_reserva) {
    console.error('Erro ao atualizar a reserva:', erro_atualizar_reserva);
    res.status(500).send('Erro ao atualizar a reserva.');
  }
}


module.exports = {
  indexView,
  homeView,
  cadastrarReserva,
  excluirReserva,
  editarReservaView,
  atualizarReserva,
};
