export class TablaDeSimbolosSemantica {
  #simbolos;

  constructor() {
    this.#simbolos = [];
  }

  agregar(tokenSemantico) {
    if (tokenSemantico.tipo === 'id') {
        if (this.contiene(tokenSemantico.lexema)) {
            throw new Error(`La variable '${tokenSemantico.lexema}' ya fue declarada anteriormente.`);
        }
    } else {
      this.simbolos.push(tokenSemantico);
    }
    
  }

  obtener(nombre) {
    return this.simbolos.find(
      s => s.lexema === nombre 
    ) || null;
  }

  contiene(nombre) {
    return this.simbolos.some(
      s => s.lexema === nombre 
    );
  }

  get simbolos() {
    return this.#simbolos;
  }

  limpiar() {
    this.simbolos = [];
  }
}
