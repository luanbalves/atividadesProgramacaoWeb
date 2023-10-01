var matrizPrimaria = [
    [1,3], 
    [2,5]
];

var matrizSecundaria = [
    [2,2], 
    [0,1]
];

const matrizString = [];



if (matrizPrimaria.length == matrizSecundaria.length) {

    var matrizTotal = [];

    for (var i = 0; i < matrizPrimaria.length; i++) {
        matrizTotal[i] = [];
        for (var j = 0; j < matrizSecundaria[0].length; j++) {
            var total = 0;
            for (var k = 0; k < matrizPrimaria[0].length; k++) {
                total += matrizPrimaria[i][k] * matrizSecundaria[k][j];
                matrizString.push(`${matrizPrimaria[i][k]} * ${matrizSecundaria[k][j]}`)
            }
            matrizTotal[i][j] = total;
        }
    }

    for (let i = 0; i < matrizString.length; i++) {
        console.log(`${matrizString[i]} + ${matrizString[i+1]}`)
        i++
    }

    console.table(matrizTotal)

} else {
    console.log("Nao e possivel calcular")
}
