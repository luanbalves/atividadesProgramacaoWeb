const Sequelize = require("sequelize");
const database = require("../db");

const Reserva = database.define("reserva", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  id_usuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  horario: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qtd_pessoas: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  indicador_ativo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  mesa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Reserva;
