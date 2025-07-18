import { AnalizadorLexico } from "../lexer/lexer.js";
import { TAS } from "./tas.js";
import { NodoArbol, Arbol } from "./arbol.js";
import { Token } from "../lexer/token.js";
import { TokenPila, Pila } from "./pila.js";
import { TokenSemantico } from "../semantic/tokenSemantico.js";

const analizadorLexico = new AnalizadorLexico();
const tas = new TAS();
const arbol = new NodoArbol('Programa');

function obtenerNoTerminales(tas) {
  const primeraColumna = tas.getColumn('__EMPTY');
  
  const noTerminales = [...new Set(
    primeraColumna
      .toArray()
      .map(v => (typeof v === 'string' ? v.trim() : v))  // Eliminar espacios en blanco
      .filter(v => v !== null && v !== undefined && v !== '')
  )];

  return noTerminales;

}

// let noTerminales = obtenerNoTerminales(tas);

// console.log('No terminales:', noTerminales);

export class Parser {
    #analizadorLexico;
    #tas;
    #arbol;
    #noTerminales;
    #pila;
    #pilaNodos;

    constructor() {
        this.#analizadorLexico = new AnalizadorLexico();
        this.#tas = new TAS();
        this.#arbol = new Arbol(); // Simbolo inicial
        this.#noTerminales = obtenerNoTerminales(this.#tas);
        this.#pila = new Pila();
        this.#pilaNodos = new Pila();
    }

    parsear() {
        
        const nodoRaiz = this.#arbol.root;
        this.#pila.push(new TokenPila('$', 'Fin de archivo', true))
        this.#pila.push(new TokenPila('Programa', 'Programa', false));
        this.#pilaNodos.push(new NodoArbol('$', true)); // Nodo terminal '$'
        this.#pilaNodos.push(nodoRaiz);                // Nodo raíz del árbol

        let siguienteCompLexico = this.#analizadorLexico.siguienteToken();
        let error = false;
        let topePila = this.#pila.pop();
        console.log(topePila.valor);
        let topePilaNodos = this.#pilaNodos.pop();

        while(!error && !this.#pila.isEmpty()){
            
            if (topePila.esTerminal) {
                console.log(topePila.valor)
                if (siguienteCompLexico.tipo === 'Real' || siguienteCompLexico.tipo === 'Int' ) {
                    if (topePila.valor === siguienteCompLexico.tipo ) { 
                        siguienteCompLexico = this.#analizadorLexico.siguienteToken();
                        topePila = this.#pila.pop();
                        topePilaNodos = this.#pilaNodos.pop();
                        continue;
                    }   
                } else
                if (siguienteCompLexico.tipo === 'id' || siguienteCompLexico.tipo === 'opRel') {
                    if (topePila.valor === siguienteCompLexico.tipo ) { 
                        siguienteCompLexico = this.#analizadorLexico.siguienteToken();
                        topePila = this.#pila.pop();
                        topePilaNodos = this.#pilaNodos.pop();
                        continue;
                    }   
                } else if (topePila.valor === siguienteCompLexico.valor) { 
                    siguienteCompLexico = this.#analizadorLexico.siguienteToken();
                    topePila = this.#pila.pop();
                    topePilaNodos = this.#pilaNodos.pop();
                    continue;
                } else {
                    console.log(`Error, se esperaba ${topePila.valor}, se encontro ${siguienteCompLexico.valor}`)
                    error = true;
                }

            } else if (!topePila.esTerminal) {
                let produccion
                console.log('Tope de la pila de simbolos: ',topePila.valor);
                console.log('Tipo Tope de la pila de simbolos: ',topePila.tipo);
                console.log('Siguiente comp lexico: ', siguienteCompLexico.valor)
                console.log('Tipo componente lex ', siguienteCompLexico.tipo)
                if (siguienteCompLexico.tipo === 'Real' || siguienteCompLexico.tipo === 'Int' ) {
                    produccion = this.#tas.getValueAt('__EMPTY', topePila.valor, siguienteCompLexico.tipo)
                } else if (siguienteCompLexico.tipo === 'id' || siguienteCompLexico.tipo === 'opRel') { // ver opRel
                     produccion = this.#tas.getValueAt('__EMPTY', topePila.valor, siguienteCompLexico.tipo)
                } else { produccion = this.#tas.getValueAt('__EMPTY', topePila.valor, siguienteCompLexico.valor)}
                
                console.log(`Producción para (${topePila.valor}, ${siguienteCompLexico.valor}):`, produccion);
                if (!produccion) {
                    console.error(`Error, ${siguienteCompLexico.valor}, no es alcanzable desde ${topePila.valor}`)
                } else if (produccion.trim() === 'ε') {
                    topePila = this.#pila.pop();
                    topePilaNodos = this.#pilaNodos.pop();
                    continue;
                } else {
                    const nodosHijos = [];
                    const simbolos = produccion.trim().split(/\s+/);
                    for (const simbolo of simbolos) {
                        
                        const esTerminal = !this.#noTerminales.includes(simbolo);
                        const tokenAsociado = new TokenSemantico(siguienteCompLexico.tipo, siguienteCompLexico.valor);
                        const nodoHijo = new NodoArbol(simbolo, esTerminal, tokenAsociado);
                        topePilaNodos.agregarHijo(nodoHijo);
                        nodosHijos.push(nodoHijo);
                        
                    }
                    for (let i = simbolos.length - 1; i >= 0; i--) {
                        const palabra = simbolos[i];
                        const esTerminal = !this.#noTerminales.includes(palabra);
                        const tokenPila = new TokenPila(palabra, palabra, esTerminal);
                        this.#pila.push(tokenPila);
                    }
                    for (let i = nodosHijos.length - 1; i >= 0; i--) {
                        this.#pilaNodos.push(nodosHijos[i]);
                    }
                    
                }
            }
            console.log('desapilo')
            topePila = this.#pila.pop();
            topePilaNodos = this.#pilaNodos.pop();

        }

        if (!error && this.#pila.isEmpty()) {
            console.log('Análisis exitoso');
            return this.#arbol;
        } else if (error) {
            console.log('Análisis con errores');
            return null;
        }
    }

}

let arbolSintactico = new Parser().parsear();
let nodoRaiz = new NodoArbol();
nodoRaiz = arbolSintactico.root;

nodoRaiz.imprimirArbol();
//console.log('El arbol de derivacion resultante es: ')
//arbolSintactico.imprimirArbol();
