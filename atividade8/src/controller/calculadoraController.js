const calculadora = require("../calculadora/calculadora");

function indexCalculadora(req, res) {
  res.render("index.html");
}

function calcular(req, res) {
  const { numeroA, numeroB, operacao } = req.body;
  let resultado;

  switch (operacao) {
    case "+":
      resultado = calculadora.somar(Number(numeroA), Number(numeroB));
      break;
    case "-":
      resultado = calculadora.subtrair(Number(numeroA), Number(numeroB));
      break;
    case "*":
      resultado = calculadora.multiplicar(Number(numeroA), Number(numeroB));
      break;
    case "/":
      resultado = calculadora.dividir(Number(numeroA), Number(numeroB));
      break;
    default:
      resultado = "Operacao invalida";
  }

  res.render("index.html", { resultado });
}

module.exports = {
  indexCalculadora,
  calcular,
};
