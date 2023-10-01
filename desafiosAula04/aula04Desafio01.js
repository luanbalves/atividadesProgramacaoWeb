const prompt = require('prompt-sync')();

function funcao() {
    const numeros = prompt("Digite 5 números separados por vírgula:");
  
    const numerosVirgula = numeros.split(",");
  
    if (numerosVirgula.length !== 5) {
      console.log("Por favor, insira exatamente 5 números separados por vírgula.");
      funcao(); 
      return;
    }
  
    const verificaNumeros = numerosVirgula.map((valor) => parseFloat(valor));
  
    if (verificaNumeros.some(isNaN)) {
      console.log("Alguns dos valores inseridos não são numéricos.");
      funcao(); 
      return;
    }
  
    console.log("Valores digitados:", verificaNumeros);
  }
  
  funcao();
  