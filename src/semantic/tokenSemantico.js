export class TokenSemantico {
    #tipo;
    #lexema;
    #esIdentificador;

    constructor(lexema = null, tipo = null, esIdentificador = false) {
        this.#lexema = lexema;
        this.#tipo = tipo;
        this.#esIdentificador = esIdentificador;
    }

    get lexema(){
        return this.#lexema;
    }

    get tipo(){
        return this.#tipo
    }

    get esIdentificador(){
        return this.#esIdentificador;
    }
}
