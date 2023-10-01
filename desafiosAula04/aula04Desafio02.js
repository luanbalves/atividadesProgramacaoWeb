function Aluno(nome) {
    this.nome = nome;
    this.notas = [];
    this.media = 0;

    this.incluirNota = function(nota) {
      this.notas.push(nota);
    };
  
    this.calcularMedia = function(callback) {
      if (this.notas.length === 0) {
        callback("O aluno não possui notas para calcular a média.");
      } else {
        const somaNotas = this.notas.reduce((total, nota) => total + nota, 0);
        const media = somaNotas / this.notas.length;
        this.media = media;
        callback(null, media);
      }
    };
  
    this.verificarAprovacao = function(callback) {
      this.calcularMedia((erro, media) => {
        if (erro) {
          callback(erro);
        } else {
          if (media >= 7) {
            callback(null, "APROVADO");
          } else {
            callback(null, "REPROVADO");
          }
        }
      });
    };
  }
  
  const aluno1 = new Aluno("João");
  aluno1.incluirNota(7);
  aluno1.incluirNota(8);
  
  aluno1.verificarAprovacao((erro, aprovacao) => {
    if (erro) {
      console.log("Erro:", erro);
    } else {
      console.log(`${aluno1.nome} está ${aprovacao} - Notas: ${aluno1.notas} - Media final: ${aluno1.media}`);
    }
  });
  
  const aluno2 = new Aluno("Maria");
  aluno2.incluirNota(5);
  aluno2.incluirNota(4);
  
  aluno2.verificarAprovacao((erro, aprovacao) => {
    if (erro) {
      console.log("Erro:", erro);
    } else {
      console.log(`${aluno2.nome} está ${aprovacao} - Notas: ${aluno2.notas} - Media final: ${aluno2.media}`);
    }
  });
  