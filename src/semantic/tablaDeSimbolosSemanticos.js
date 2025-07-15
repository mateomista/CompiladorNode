class EntradaTablaSimbolos {
  constructor(nombre, tipo, scope, infoAdicional = {}) {
    this.nombre = nombre;       // identificador
    this.tipo = tipo;           // tipo de dato (int, real, etc.)
    this.scope = scope;         // ámbito (global, local, función, etc.)
    this.infoAdicional = infoAdicional; // otros atributos
  }
}

export class TablaDeSimbolosSemantica {
  constructor() {
    this.simbolos = [];
  }

  agregar(nombre, tipo, scope, infoAdicional = {}) {
    if (this.contiene(nombre, scope)) {
      throw new Error(`Símbolo '${nombre}' ya declarado en el ámbito '${scope}'`);
    }
    this.simbolos.push(new EntradaTablaSimbolos(nombre, tipo, scope, infoAdicional));
  }

  obtener(nombre, scope) {
    return this.simbolos.find(
      s => s.nombre === nombre && s.scope === scope
    ) || null;
  }

  contiene(nombre, scope) {
    return this.simbolos.some(
      s => s.nombre === nombre && s.scope === scope
    );
  }

  limpiar() {
    this.simbolos = [];
  }
}
