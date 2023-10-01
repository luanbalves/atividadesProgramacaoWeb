const calculadora = {
    total: 1,

    fatorial: function (n) {

        if (n > 1) {

            if (this.total === 1) {
                this.total = n;
            }
            
            this.total = this.total * (n-1);            
            
            console.log(this.total);
            
            if (n > 2) {
                this.fatorial(n-1);
            }

        } else {
            console.log(1);
        }
    }
}

calculadora.fatorial(9);