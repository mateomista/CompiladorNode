import { esIdentificador } from "../lexer/automatas/esIdentificador.js";
import { Arbol } from "../parser/arbol.js";
import { Parser } from "../parser/parser.js";
import { TokenSemantico } from "./tokenSemantico.js";

export class AnalizadorSemantico {
    
    #tablaDeSimbolos;
    #errores;
    #arbol;
    
    constructor(arbol) {
        this.#tablaDeSimbolos = new TablaSimbolos();
        this.#errores = [];
        this.#arbol = arbol;
    }

    analizar() {

        let raiz = arbol.root;
        if (!nodo) return;

        switch (nodo.simbolo) {
            case 'Programa':
                this.manejarPrograma(nodo);
                break;
            case 'DeclaracionVar':
                this.manejarDeclaracionVar(nodo);
                break;
            case 'Declaracion':
                this.manejarDeclaracion(nodo);
                break;
            case 'Tipo':
                this.manejarTipo(nodo);
                break;
            case 'Cuerpo':
                this.manejarCuerpo(nodo);
                break;
            case 'Secuencia':
                this.manejarSecuencia(nodo);
                break;
            case 'Sentencia':
                this.manejarSentencia(nodo);
                break;
            case 'Asignacion':
                this.manejarAsignacion(nodo);
                break;
            case 'AsignacionDetalle':
                this.manejarAsignacionDetalle(nodo);
                break;
            case 'ExpArit':
                this.manejarExpArit(nodo);
                break;
            case "ExpArit'":
                this.manejarExpAritPrima(nodo);
                break;
            case 'Termino':
                this.manejarTermino(nodo);
                break;
            case "Termino'":
                this.manejarTerminoPrima(nodo);
                break;
            case 'Factor':
                this.manejarFactor(nodo);
                break;
            case "Factor'":
                this.manejarFactorPrima(nodo);
                break;
            case 'Potencia':
                this.manejarPotencia(nodo);
                break;
            case 'Leer':
                this.manejarLeer(nodo);
                break;
            case 'Escribir':
                this.manejarEscribir(nodo);
                break;
            case 'ListaEscritura':
                this.manejarListaEscritura(nodo);
                break;
            case 'ListaCadena':
                this.manejarListaCadena(nodo);
                break;
            case 'SiEntSino':
                this.manejarSiEntSino(nodo);
                break;
            case "SiEntSino'":
                this.manejarSiEntSinoPrima(nodo);
                break;
            case 'While':
                this.manejarWhile(nodo);
                break;
            case 'For':
                this.manejarFor(nodo);
                break;
            case 'Condicion':
                this.manejarCondicion(nodo);
                break;
            case "CondicionPrima":
                this.manejarCondicionPrima(nodo);
                break;
            case 'TerminoLogico':
                this.manejarTerminoLogico(nodo);
                break;
            case "TerminoLogicoPrima":
                this.manejarTerminoLogicoPrima(nodo);
                break;
            case 'FactorLogico':
                this.manejarFactorLogico(nodo);
                break;
            default:
                // Recorrer hijos si no hay método específico
                for (const hijo of nodo.hijos) {
                    this.analizarSemantica(hijo);
                }
                break;
        }

    }

    // Programa → “Program” “id” “;” DeclaracionVar “{“ Cuerpo “}”
    manejarPrograma(nodo){
        this.#tablaDeSimbolos.agregar(new TokenSemantico(nodo.hijos[1].simbolo, null, true));
        this.manejarDeclaracion(nodo.hijos[3]);
    }

    manejarDeclaracion(nodo) {
        const nombreVar = nodo.hijos[0].simbolo;
        const tipoVar = nodo.hijos[2].simbolo;
        if (this.#tablaDeSimbolos.existe(nombreVar)) {
            this.#errores.push(`Variable '${nombreVar}' ya declarada`);
        } else {
            this.#tablaDeSimbolos.agregar(nombreVar, { tipo: tipoVar });
        }
        // Continuar análisis en hijos relevantes
    }

    manejarAsignacion(nodo) {
        // Verificar variable declarada, tipos, etc.
    }

    reportarErrores() {
        this.errores.forEach(e => console.error(e));
    }
}

let analizadorSintactico = new Parser();
const arbol = analizadorSintactico.parsear();

let analizadorSemantico = new AnalizadorSemantico(arbol);

analizadorSemantico.analizar();

if (arbol) {
    const tablaSimbolos = new TablaSimbolosSemantica();
    analizarSemantica(arbol.root, tablaSimbolos);
} 

arbol.imprimirArbol();