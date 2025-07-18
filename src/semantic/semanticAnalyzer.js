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
        this.#tablaDeSimbolos.agregar(new TokenSemantico('id', nodo.hijos[1].token.lexema, nodo.hijos[1].token.lexema, null, false));
        this.manejarDeclaracionVar(nodo.hijos[3]);
        this.manejarCuerpo(nodo.hijos[5]);
    }

    // DeclaracionVar → Declaracion DeclaracionVar | ε
    manejarDeclaracionVar(nodo) {
        
            if (!nodo.hijos || nodo.hijos.length === 0) return;
            this.manejarDeclaracion(nodo.hijos[0]);
            if (nodo.hijos[1]) this.manejarDeclaracionVar(nodo.hijos[1]);
        

    }

    // Declaracion → “id” “:” Tipo “;”
    manejarDeclaracion(nodo) {

        this.manejarTipo(nodo.hijos[2])
        const tipoDato = nodo.hijos[2].token.tipoDeclarado;
        const esArray = nodo.hijos[2].hijos[1] !== undefined && nodo.hijos[2].hijos[1] !== null;

        try {
            const token = new TokenSemantico('var', nodo.hijos[0].token.lexema, null, tipoDato, esArray)
            this.#tablaDeSimbolos.agregar(token);
        } catch (e) {
            this.#errores.push(e.message);
        }

    }
    
    // Tipo → TipoBase TipoArreglo
    manejarTipo(nodo) {

        nodo.token.tipoDeclarado = nodo.hijos[0].simbolo;

    }

    // Cuerpo → Secuencia 
    manejarCuerpo(nodo) {
        this.manejarSecuencia(nodo.hijos[0]);
    }

    // Secuencia → Sentencia Secuencia | ε
    manejarSecuencia(nodo){
        if (!nodo.hijos || nodo.hijos.length === 0) return;
        this.manejarSentencia(nodo.hijos[0]);
        if (nodo.hijos[1]) this.manejarDeclaracionVar(nodo.hijos[1]);
    }

    // Sentencia → Asignacion “;” | Escribir “;”  | SiEntSino “;”  | While “;” | For “;”
    manejarSentencia(nodo){

        const sentencia = nodo.hijos[0].simbolo;
        const nodo = nodo.hijos[0];

        switch(sentencia) {
            case 'Asignacion':
                this.manejarAsignacion(nodo);
                break;
            case 'Escribir':
                this.manejarEscribir(nodo);
                break;
            case 'SiEntSino':
                this.manejarSiEntSino(nodo);
                break;
            case 'While':
                this.manejarWhile(nodo);
                break;
            case 'For':
                this.manejarFor(nodo);
                break;
            default:
                return;
        }

    }

    // Asignacion → Variable “:=” AsignacionDetalle
    manejarAsignacion(nodo) {
        const tokenSemantico = this.#tablaDeSimbolos.obtener(nodo.hijos[0].token.lexema);
        if (!tokenSemantico) {
            this.#errores.push(`Error. Variable ${nodo.hijos[0].token.lexema} no declarada`);
            return;
        } else if (tokenSemantico.tipoDato != nodo.hijo[2].token.tipoDato){

            this.#errores.push(`Error. Variable ${nodo.hijos[0].token.lexema} declarada como ${tokenSemantico.tipoDato}, no se puede asignar ${nodo.hijo[2].token.tipoDato}`);

        } else {
            this.manejarAsignacionDetalle(nodo.hijos[2])
            // nodo.hijos[0].hijos[0].token.valor = nodo.hijos[2].hijos[]
        }
         
    }

    // AsignacionDetalle →  ExpArit | Leer
    manejarAsignacionDetalle(nodo){
        if (nodo.hijos[0].simbolo === 'ExpArit') {
            this.manejarExpArit(nodo.hijos[0]);
        } else {
            this.manejarLeer(nodo.hijos[0]);
        }
    }

    // ExpArit → Termino ExpArit'
    manejarExpArit(nodo){
        this.manejarTermino(nodo.hijos[0]);
        this.manejarExpAritPrima(nodo.hijos[1]);
    }

    // Termino → Factor Termino'
    manejarTermino(nodo){
        this.manejarFactor(nodo.hijos[0]);
        this.manejarTerminoLogicoPrima(nodo.hijos[1])
    }

    // Factor → Potencia Factor'
    manejarFactor(nodo) {
        this.manejarPotencia(nodo.hijos[0]);
        this.manejarFactorPrima(nodo.hijos[1]);
    }

    // Potencia → “(“ ExpArit “)” | Variable | Real | LiteralArray | “-” Potencia 
    manejarPotencia(nodo) {
        let produccion = nodo.hijos[0].simbolo;

        switch(produccion) {
            case 'Variable': 
                this.manejarVariable(nodo.hijos[0]);
                nodo.token.tipoDeclarado = nodo.hijos[0].token.tipoDato;
                nodo.token.valor = nodo.hijos[0].token.valor;
            case 'Real':
                nodo.hijo[0].token.valor = Number(nodo.hijo[0].token.lexema);
                nodo.token.valor = nodo.hijo[0].token.valor
        }
    }

    // Variable → “id” AccesoArreglo
   manejarVariable(nodo) {
        const lexema = nodo.hijos[0].token.lexema;
        
        const tokenTS = this.#tablaDeSimbolos.obtener(lexema);
        
        if (tokenTS) {

            nodo.token.tipoDato = tokenTS.tipoDato;    
            nodo.token.tipo = 'var';                    

        } else {
            this.#errores.push(`Error. Variable '${lexema}' no declarada`);
            return;
        } 

        if (nodo.hijos[1]) {
            this.manejarAccesoArreglo(nodo.hijos[1]);
        }
    }

    manejarAccesoArreglo(nodo) {
        
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