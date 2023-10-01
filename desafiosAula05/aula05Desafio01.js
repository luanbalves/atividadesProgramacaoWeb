function Item(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
  
  function CarrinhoDeCompras() {
    this.itens = [];
  
    this.adicionarItem = function(item) {
      this.itens.push(item);
    };
  
    this.calcularTotal = function(desconto, callback) {
      if (this.itens.length === 0) {
        callback("O carrinho está vazio.", null);
        return;
      }
  
      let total = 0;
  
      this.itens.forEach(function(item) {
        total += item.preco;
      });
  
      if (desconto) {
        total *= 0.95; 
      }
  
      callback(null, total);
    };
  }
  
  const carrinhoDeCompras = new CarrinhoDeCompras();
  
  const item1 = new Item("Arroz", 6.50);
  const item2 = new Item("Feijão", 7.29);
  const item3 = new Item("Biscoito", 5.79);
  const item4 = new Item("Azeite", 29.99);

  carrinhoDeCompras.adicionarItem(item1);
  carrinhoDeCompras.adicionarItem(item2);
  carrinhoDeCompras.adicionarItem(item3);
  carrinhoDeCompras.adicionarItem(item4);

  carrinhoDeCompras.calcularTotal(false, function(erro, total) {
    if (erro) {
      console.log("Erro:", erro);
    } else {
      console.log("Valor total da compra sem desconto: R$" + total.toFixed(2));
    }
  });
  
  carrinhoDeCompras.calcularTotal(true, function(erro, total) {
    if (erro) {
      console.log("Erro:", erro);
    } else {
      console.log("Valor total da compra com desconto: R$" + total.toFixed(2));
    }
  });
  