function retornaPalavras(string) {
    const arrayString = string.split(' ');
    
    for (let index = 0; index < arrayString.length; index++) {
        console.log(arrayString[index])   
    }    
}

retornaPalavras('Luan Alves Barroso');