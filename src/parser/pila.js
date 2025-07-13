
export class TokenPila {
    #valor;
    #tipo;
    #esTerminal;

    constructor(valor, tipo, esTerminal = false) {
        this.#valor = valor; // Valor del token (nombre de variable, número, símbolo, etc.)
        this.#tipo = tipo; // Tipo de token (identificador, número, operador, etc.)
        this.#esTerminal = esTerminal; // Indica si es un terminal o no
    }

    get valor() {
        return this.#valor;
    }

    get tipo() {
        return this.#tipo;
    }

    get esTerminal() {
        return this.#esTerminal;
    }

}

export class Pila {
    #elementos;

    constructor() {
        this.#elementos = [];
    }

    push(token) {
        this.#elementos.push(token);
    }

    pop() {
        return this.#elementos.pop();
    }

    peek() {
        return this.#elementos[this.#elementos.length - 1];
    }

    isEmpty() {
        return this.#elementos.length === 0;
    }

    size() {
        return this.#elementos.length;
    }

    clear() {
        this.#elementos = [];
    }
}