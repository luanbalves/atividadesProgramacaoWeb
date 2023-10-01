var matriz = [
    [1,2], 
    [3,4],
    [5,6]
];

console.table(matriz)

for (var i = 0; i < matriz.length; i++) {
    for (var j = 0; j < i; j++) {
        var matrizTemporaria = matriz[i][j];
        matriz[i][j] = matriz[j][i];
        matriz[j][i] = matrizTemporaria;
    }
}
matriz.length = 2;

console.table(matriz)


