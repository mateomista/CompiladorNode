import { Token } from './token.js';

const palabrasReservadas = [
  "Program",
  "end",
  "Read",
  "Write",
  "if",
  "then",
  "else",
  "while",
  "do",
  "for",
];

export class TablaDeSimbolos {
  constructor(array = palabrasReservadas) {
    this.simbolos = [];
    array.forEach(element => {
      this.simbolos.push(new Token(element, element));
    });
  }

  agregar(token) {
    if (!this.simbolos.some(t => t.lexema === token.lexema)) {
      this.simbolos.push(token);
    }
  }

  obtener(lexema) {
    return this.simbolos.find(t => t.lexema === lexema) || null;
  }

  contiene(lexema) {
    return this.simbolos.some(t => t.lexema === lexema);
  }

  limpiar() {
    this.simbolos = [];
  }
}
