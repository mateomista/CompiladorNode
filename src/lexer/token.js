class Token {

    constructor(tipo, valor) {
        this.tipo = tipo; // Tipo de token (identificador, número, operador, etc.)
        this.valor = valor; // Valor del token (nombre de variable, número, símbolo, etc.)
    }

    toString() {
        return `Token(Tipo: ${this.tipo}, Lexema: ${this.valor})`;
    }
    
}