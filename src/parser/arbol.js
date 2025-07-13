export class Arbol {
    #root;
    constructor() {
        this.#root = new NodoArbol('Programa'); // Nodo raíz del árbol
    }

    get root() {
        return this.#root;
    }

    imprimirArbol(nodo = this.#root, indent = '') {
        if (!nodo) return;
        console.log(indent + nodo.simbolo);
        if (nodo.hijos && nodo.hijos.length > 0) {
            for (const hijo of nodo.hijos) {
                this.imprimirArbol(hijo, indent + '  '); // Llamada recursiva con this
            }
        }
    }
}

export class NodoArbol {
    #simbolo;
    #hijos;
    #esTerminal;

    constructor(simbolo, esTerminal = false) {
        this.#simbolo = simbolo;
        this.#hijos = [];
        this.#esTerminal = esTerminal; 
    }

    agregarHijo(nodoHijo) {
        this.#hijos.push(nodoHijo);
        return this; 
    }

    get simbolo() {
        return this.#simbolo;
    }

    get hijos() {
        return this.#hijos;
    }

    get esTerminal() {
        return this.#esTerminal;
    }

    imprimirArbol(nodo, nivel = 0) {
        // Indentación según nivel para visualizar jerarquía
        const indent = '  '.repeat(nivel);
        console.log(`${indent}- ${nodo.simbolo} ${nodo.esTerminal ? '(Terminal)' : '(No Terminal)'}`);

        // Recorrer hijos recursivamente
        for (const hijo of nodo.hijos) {
            imprimirArbol(hijo, nivel + 1);
        }
    }

}