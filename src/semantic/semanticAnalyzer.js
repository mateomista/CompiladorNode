import { Arbol } from "../parser/arbol.js";
import { Parser } from "../parser/parser.js";

function analizarSemantica(nodo, tablaSimbolos) {
    if (!nodo) return;

    switch (nodo.simbolo) {
        case 'Declaracion':
            
            const nombreVar = nodo.hijos[0].simbolo;
            if (tablaSimbolos.existe(nombreVar)) {
                console.error(`Error semántico: variable '${nombreVar}' ya declarada`);
            } else {
                tablaSimbolos.agregar(nombreVar, { tipo: 'int' }); 
            }
            break;

        case 'Asignacion':
            
            break;

        // agregar producciones

        default:
           
            for (const hijo of nodo.hijos) {
                analizarSemantica(hijo, tablaSimbolos);
            }
    }
}

let analizadorSintactico = new Parser();

const arbol = analizadorSintactico.parsear();

if (arbol) {
    const tablaSimbolos = new TablaSimbolosSemantica();
    analizarSemantica(arbol.root, tablaSimbolos);
} 


arbol.imprimirArbol();